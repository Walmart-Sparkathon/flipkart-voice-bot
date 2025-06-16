
import React from 'react';
import { Bot, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  message: string;
  sender: "user" | "bot";
  createdAt?: string;
};

const botColors = {
  background: "bg-blue-50",
  text: "text-blue-900",
  border: "border-blue-300",
};
const userColors = {
  background: "bg-yellow-50",
  text: "text-yellow-900",
  border: "border-yellow-300",
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const align = sender === "user" ? "justify-end" : "justify-start";
  const colors = sender === "user" ? userColors : botColors;
  const Icon = sender === "user" ? MessageCircle : Bot;

  return (
    <div className={cn("flex my-1", align)}>
      {sender === "bot" && (
        <span className="mr-2 flex items-end">
          <Bot className="h-6 w-6 text-blue-400" />
        </span>
      )}
      <div
        className={cn(
          "relative px-4 py-2 max-w-[75%] rounded-xl border text-base animate-fade-in",
          colors.background,
          colors.border,
          colors.text,
          sender === "user" ? "rounded-br-none shadow-md" : "rounded-bl-none shadow"
        )}
        tabIndex={0}
        aria-label={`${sender === "bot" ? "Milo: " : "You: "}${message}`}
      >
        {message}
      </div>
      {sender === "user" && (
        <span className="ml-2 flex items-end">
          <MessageCircle className="h-6 w-6 text-yellow-400" />
        </span>
      )}
    </div>
  );
};

export default ChatBubble;
