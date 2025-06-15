
import React, { useRef, useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import VoiceButton from "./VoiceButton";
import { X, Bot, ChevronDown } from "lucide-react";

const FLIPKART_BLUE = "#2874f0";
const FLIPKART_YELLOW = "#ffe11b";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const BOT_WELCOME = "Hi, I'm Rufus! How can I assist you with Flipkart products today?";
// For the demo, mock a reply (can be API-integrated later).
function getBotReply(userText: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      if (/laptop|mobile|phone/i.test(userText)) {
        resolve(
          "Looking for electronics? You can explore the latest laptops or mobiles! Need help comparing options?"
        );
      } else if (/order|track/i.test(userText)) {
        resolve(
          "To track your order, please visit 'My Orders' from your Flipkart account. Shall I open the orders page for you?"
        );
      } else if (/hi|hello|hey/i.test(userText)) {
        resolve("Hello! How can I help you find the right product?");
      } else {
        resolve(
          "I'm here to help! You can ask about products, deals, orders, or anything else related to shopping on Flipkart."
        );
      }
    }, 1100);
  });
}

// Voice helpers
function speak(text: string) {
  if ("speechSynthesis" in window) {
    const s = new window.SpeechSynthesisUtterance(text);
    s.lang = "en-IN";
    s.rate = 1.02;
    window.speechSynthesis.speak(s);
  }
}
// Handles browser SpeechRecognition events
function useVoiceInput({ onResult, listening }: { onResult: (txt: string) => void; listening: boolean }) {
  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && listening) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
      recognition.onerror = () => {};
      recognition.start();
    }
    return () => recognition && recognition.stop();
    // eslint-disable-next-line
  }, [listening]);
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false); // Is the chatbot window open
  const [messages, setMessages] = useState<Message[]>([{ id: 1, text: BOT_WELCOME, sender: "bot" }]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    requestAnimationFrame(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    });
  }, [messages, open]);

  useVoiceInput({
    listening,
    onResult: (text) => {
      setInput(text);
      setListening(false);
    },
  });

  const handleUserSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((curr) => [
      ...curr,
      { id: Date.now(), text, sender: "user" },
    ]);
    setInput("");
    setLoading(true);
    const reply = await getBotReply(text);
    setTimeout(() => {
      setMessages((curr) => [
        ...curr,
        { id: Date.now() + 1, text: reply, sender: "bot" },
      ]);
      setLoading(false);
      speak(reply);
    }, 700);
  };

  // "Enter" submits, shift+enter = newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserSend();
    }
  };

  // Minimized bubble ("Need help?") at bottom right
  if (!open)
    return (
      <button
        className="fixed bottom-7 right-7 bg-white border-2 border-blue-200 shadow-lg rounded-full px-4 py-3 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform z-50 animate-scale-in"
        style={{ boxShadow: "0 4px 18px 0 rgba(40,116,240,0.10)" }}
        onClick={() => setOpen(true)}
        aria-label="Chat with Rufus"
      >
        <Bot className="text-blue-400 w-7 h-7" />
        <span className="font-semibold text-blue-900 text-sm">Need help? Ask Rufus</span>
      </button>
    );

  // Chatbot main window
  return (
    <div
      className="fixed bottom-7 right-7 flex flex-col bg-white rounded-2xl border border-blue-300 shadow-2xl overflow-hidden animate-fade-in z-50"
      style={{
        width: "380px",
        maxWidth: "96vw",
        minHeight: "420px",
        maxHeight: "82vh",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-blue-200"
        style={{ background: FLIPKART_BLUE }}
      >
        <Bot className="w-7 h-7 text-white mr-1" />
        <span className="text-white font-bold text-lg tracking-wide select-none">Rufus</span>
        <span className="ml-auto flex gap-2">
          <button
            className="hover:bg-blue-200/40 p-1 rounded transition-colors"
            onClick={() => setOpen(false)}
            tabIndex={0}
            aria-label="Minimize chat"
          >
            <ChevronDown className="text-white w-6 h-6" />
          </button>
          <button
            className="hover:bg-blue-200/40 p-1 rounded transition-colors"
            onClick={() => setOpen(false)}
            tabIndex={0}
            aria-label="Close chat"
          >
            <X className="text-white w-6 h-6" />
          </button>
        </span>
      </div>
      {/* Chat area */}
      <div
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto px-4 py-3 bg-blue-50"
        style={{ minHeight: 200, maxHeight: 420, background: "#f6f8fc" }}
        tabIndex={0}
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.text} sender={msg.sender} />
        ))}
        {loading && (
          <div className="flex justify-start my-1">
            <div className="animate-pulse px-4 py-2 rounded-xl bg-blue-100 text-blue-900 border border-blue-300 shadow min-w-[60px]">...</div>
          </div>
        )}
      </div>
      {/* Input area */}
      <div className="flex items-end gap-2 px-3 py-2 border-t border-blue-200 bg-white">
        <textarea
          className="flex-grow resize-none px-3 py-2 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base min-h-[38px] max-h-[76px] bg-blue-50"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Type your message"
          rows={1}
        />
        <VoiceButton
          listening={listening}
          onClick={() => setListening(l => !l)}
          disabled={loading}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded shadow transition-all flex items-center disabled:bg-blue-300"
          style={{ background: input.trim() ? FLIPKART_BLUE : "#b8dafc" }}
          onClick={handleUserSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          tabIndex={0}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
