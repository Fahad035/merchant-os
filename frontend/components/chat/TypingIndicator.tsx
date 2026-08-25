"use client";

import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* AI Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
        <Bot size={18} />
      </div>

      {/* Bubble */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white">
            MerchantOS AI
          </span>

          <span className="text-xs text-gray-500">Thinking...</span>
        </div>

        <div className="flex items-center gap-2 py-1">
          <div
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500"
            style={{ animationDelay: "0ms" }}
          />

          <div
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500"
            style={{ animationDelay: "150ms" }}
          />

          <div
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
