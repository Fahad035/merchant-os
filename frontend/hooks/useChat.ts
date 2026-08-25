"use client";

import { useState } from "react";

import { ChatMessage, Conversation } from "@/types/chat";

import { sendMessage } from "@/lib/chat-api";

const DEMO_MERCHANT_ID =
  process.env.NEXT_PUBLIC_MERCHANT_ID || "REPLACE_WITH_YOUR_MERCHANT_UUID";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [conversation, setConversation] = useState<Conversation | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function send(content: string) {
    if (!content.trim()) return null;

    setLoading(true);
    setError("");

    try {
      const response = await sendMessage({
        merchant_id: DEMO_MERCHANT_ID,
        conversation_id: conversation?.id,
        message: content,
      });

      setConversation(response.conversation);

      setMessages((previous) => [
        ...previous,
        response.user_message,
        response.assistant_message,
      ]);

      return response.conversation;
    } catch (err: any) {
      setError(err.message || "Unable to contact MerchantOS.");

      return null;
    } finally {
      setLoading(false);
    }
  }

  function newConversation() {
    setConversation(null);
    setMessages([]);
    setError("");
  }

  return {
    conversation,
    messages,
    loading,
    error,
    send,
    newConversation,
  };
}
