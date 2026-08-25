"use client";

import { MessageSquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Conversation } from "@/types/chat";

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onNewConversation: () => void;
  onSelectConversation?: (
    conversation: Conversation
  ) => void;
}

export default function ChatSidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full w-80 flex-col border-r bg-card">

      {/* Logo */}

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold">
          MerchantOS
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          AI Commerce Copilot
        </p>

      </div>

      {/* New Chat */}

      <div className="p-4">

        <Button
          className="w-full"
          onClick={onNewConversation}
        >
          <MessageSquarePlus className="mr-2 h-4 w-4" />

          New Chat

        </Button>

      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto p-3">

        {conversations.length === 0 && (

          <div className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">

            No conversations yet.

          </div>

        )}

        <div className="space-y-2">

          {conversations.map((conversation) => {

            const active =
              conversation.id ===
              currentConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() =>
                  onSelectConversation?.(
                    conversation
                  )
                }
                className={`w-full rounded-lg border p-3 text-left transition

                  ${
                    active
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "hover:bg-muted"
                  }`}
              >
                <div className="truncate font-medium">
                  {conversation.title}
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(
                    conversation.updated_at
                  ).toLocaleDateString()}
                </div>
              </button>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-4">

        <div className="rounded-lg bg-muted p-3">

          <div className="font-semibold">
            MerchantOS AI
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Razorpay Buildathon Demo
          </div>

        </div>

      </div>

    </aside>
  );
}