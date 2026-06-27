export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RecommendedDoctor {
  _id: string;
  name: string;
  specialty: string;
  availableDays: string[];
  availableTime: {
    start: string;
    end: string;
  };
}

export interface ChatResponse {
  success: boolean;
  reply: string;
  recommendedDoctor: RecommendedDoctor | null;
}