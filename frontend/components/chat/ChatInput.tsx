"use client";

import { useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  loading: boolean;
  onSend: (message: string) => Promise<void>;
}

export default function ChatInput({
  loading,
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height =
      textarea.scrollHeight + "px";
  }

  async function handleSend() {
    const text = message.trim();

    if (!text) return;

    await onSend(text);

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      await handleSend();
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3">
        <Textarea
          ref={textareaRef}
          value={message}
          disabled={loading}
          rows={1}
          placeholder="Ask MerchantOS anything..."
          className="max-h-40 min-h-12 resize-none"
          onChange={(event) => {
            setMessage(event.target.value);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
        />

        <Button
          size="icon"
          disabled={
            loading || !message.trim()
          }
          onClick={handleSend}
        >
          <SendHorizontal
            className="h-5 w-5"
          />
        </Button>
      </div>
    </div>
  );
}