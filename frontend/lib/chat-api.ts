import api from "./api";

import {
  ChatRequest,
  ChatResponse,
  ChatMessage,
  Conversation,
} from "@/types/chat";

/**
 * Send a message to MerchantOS AI.
 */
export async function sendMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  const response = await api.post<ChatResponse>(
    "/chat",
    request
  );

  return response.data;
}

/**
 * Fetch all conversations for a merchant.
 */
export async function getConversationHistory(
  merchantId: string
): Promise<Conversation[]> {
  const response = await api.get<Conversation[]>(
    `/chat/history/${merchantId}`
  );

  return response.data;
}

/**
 * Fetch messages for a conversation.
 */
export async function getConversationMessages(
  conversationId: string
): Promise<ChatMessage[]> {
  const response = await api.get<ChatMessage[]>(
    `/chat/conversation/${conversationId}`
  );

  return response.data;
}