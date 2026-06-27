import axiosInstance from "./axiosService";
import type { ChatMessage, ChatResponse } from "../types/chat";

export const sendChatMessage = async (
  messages: ChatMessage[],
): Promise<ChatResponse> => {
  const response = await axiosInstance.post<ChatResponse>("/chat", {
    messages,
  });
  return response.data;
};