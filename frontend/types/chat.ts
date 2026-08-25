export interface Conversation {
  id: string;
  merchant_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatRequest {
  merchant_id: string;
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  conversation: Conversation;
  user_message: ChatMessage;
  assistant_message: ChatMessage;
}