import api from "./api";

interface ChatResponse {
  response: string;
}

export async function askCareerChatbot(
  message: string,
  sessionId: string
): Promise<string> {
  const response = await api.post<ChatResponse>("/chat/ask_career", {
    message,
    session_id: sessionId,
  });

  return response.data.response;
}