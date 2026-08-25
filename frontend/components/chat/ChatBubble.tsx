"use client";

import { Bot, User } from "lucide-react";

import { ChatMessage } from "@/types/chat";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({
  message,
}: ChatBubbleProps) {
  const isUser = message.role === "user";

  const formattedTime = new Date(
    message.created_at
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 shadow ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-8">
          <span className="font-semibold">
            {isUser ? "You" : "MerchantOS AI"}
          </span>

          <span
            className={`text-xs ${
              isUser
                ? "text-blue-100"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {formattedTime}
          </span>
        </div>

        <div className="whitespace-pre-wrap text-sm leading-7">
          {message.content}
        </div>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
          <User size={18} />
        </div>
      )}
    </div>
  );
}