"use client";

import { useState } from "react";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

import { useChat } from "@/hooks/useChat";

import { Conversation } from "@/types/chat";

export default function ChatPage() {
  const { conversation, messages, loading, error, send, newConversation } =
    useChat();

  const [conversations, setConversations] = useState<Conversation[]>([]);

  async function handleSend(message: string) {

    const createdConversation = await send(message);

    // Add newly created conversation to sidebar
    if (
      createdConversation &&
      !conversations.find((c) => c.id === createdConversation.id)
    ) {
      setConversations((prev) => [createdConversation, ...prev]);
    }
  }

  function handleNewConversation() {
    newConversation();
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}

      <ChatSidebar
        conversations={conversations}
        currentConversationId={conversation?.id}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat */}

      <div className="flex-1">
        <ChatWindow
          messages={messages}
          loading={loading}
          error={error}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
