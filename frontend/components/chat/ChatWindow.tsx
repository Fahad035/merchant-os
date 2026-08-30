"use client";

import { useEffect, useRef } from "react";

import { ChatMessage } from "@/types/chat";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  messages: ChatMessage[];
  loading: boolean;
  error?: string;
  onSend: (message: string) => Promise<void>;
}

export default function ChatWindow({
  messages,
  loading,
  error,
  onSend,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col bg-background">

      {/* Header */}

      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-bold">
          MerchantOS AI
        </h1>

        <p className="text-sm text-muted-foreground">
          Your Autonomous Commerce Copilot
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto px-6 py-6">

        {messages.length === 0 && !loading && (
          <div className="mx-auto mt-24 max-w-xl text-center">

            <h2 className="mb-4 text-3xl font-bold">
              Welcome to MerchantOS
            </h2>

            <p className="text-muted-foreground">
              Ask me anything about your store.
            </p>

            <div className="mt-8 space-y-3">

              <div className="rounded-lg border p-4 text-left">
                How can I increase my revenue this month?
              </div>

              <div className="rounded-lg border p-4 text-left">
                Which products should I bundle?
              </div>

              <div className="rounded-lg border p-4 text-left">
                Analyze my recent sales performance.
              </div>
              <div className="rounded-lg border p-4 text-left">
                Suggest a marketing campaign.
              </div>
              <div className="rounded-lg border p-4 text-left">
                Which products need restocking?
              </div>
              <div className="rounded-lg border p-4 text-left">
                Summarize my business performance.
              </div>

            </div>

          </div>
        )}

        <div className="mx-auto flex max-w-4xl flex-col gap-5">

          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="border-t bg-red-50 px-6 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Input */}

      <ChatInput
        loading={loading}
        onSend={onSend}
      />

    </div>
  );
}