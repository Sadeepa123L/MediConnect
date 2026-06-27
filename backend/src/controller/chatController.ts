import { Request, Response } from "express";
import doctorModel from "../model/doctorModel";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const chatWithAssistant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { messages } = req.body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ message: "messages array is required" });
      return;
    }

    const doctors = await doctorModel.find({ isActive: true });

    const doctorList = doctors
      .map(
        (doc) =>
          `- id: ${doc._id}, name: ${doc.name}, specialty: ${doc.specialty}, available: ${doc.availableDays.join(", ")} between ${doc.availableTime.start}-${doc.availableTime.end}`,
      )
      .join("\n");

    const systemPrompt = `You are a friendly medical triage assistant for a clinic booking app called MediCare.

Your job:
1. Ask the patient about their symptoms if they haven't described them yet.
2. Based on symptoms, suggest which medical specialty they likely need.
3. From the list of REAL doctors below, recommend ONE specific doctor that matches that specialty. NEVER invent or mention a doctor who is not in this list.
4. If no doctor in the list matches the needed specialty, say so honestly and suggest General Medicine if available, or advise them to consult a doctor in person.
5. Keep responses short (2-4 sentences max).
6. Always remind the patient this is not a medical diagnosis and they should consult the doctor for confirmation, especially for anything serious or urgent.
7. If symptoms sound severe or emergency-related (chest pain, difficulty breathing, severe bleeding, etc.), tell them to seek emergency care immediately instead of booking online.

Available doctors right now:
${doctorList || "No doctors currently available."}

When you recommend a specific doctor, end your message with a line in EXACTLY this format so the app can detect it:
[RECOMMEND_DOCTOR_ID: <the id from the list above>]

Only include that line when you are confidently recommending one specific doctor. Do not include it while still asking clarifying questions.`;

    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI API error:", errorBody);
      res.status(502).json({ message: "Failed to get response from assistant" });
      return;
    }

    const data = await response.json();
    const rawReply: string = data.choices?.[0]?.message?.content || "";

    const recommendMatch = rawReply.match(/\[RECOMMEND_DOCTOR_ID:\s*([a-f0-9]{24})\]/i);
    let recommendedDoctor = null;

    if (recommendMatch) {
      const doctorId = recommendMatch[1];
      recommendedDoctor = doctors.find((doc) => doc._id.toString() === doctorId) || null;
    }

    const cleanReply = rawReply.replace(/\[RECOMMEND_DOCTOR_ID:\s*[a-f0-9]{24}\]/i, "").trim();

    res.status(200).json({
      success: true,
      reply: cleanReply,
      recommendedDoctor: recommendedDoctor
        ? {
            _id: recommendedDoctor._id,
            name: recommendedDoctor.name,
            specialty: recommendedDoctor.specialty,
            availableDays: recommendedDoctor.availableDays,
            availableTime: recommendedDoctor.availableTime,
          }
        : null,
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};