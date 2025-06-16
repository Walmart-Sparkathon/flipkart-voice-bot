
// Add chatbot to the root page
import Chatbot from "@/components/Chatbot";
import {  Bot, ChevronDown } from "lucide-react";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Floating Walmart logo bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <svg className="w-20 h-20 text-blue-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2L4,12L12,22L20,12L12,2Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        {/* Animated headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-900 animate-fade-in">
          <span className="inline-block">Welcome to Your </span>
          <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Walmart Assistant
          </span>
        </h1>

        {/* Animated subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in delay-100">
          Meet <span className="font-semibold text-blue-600">Milo</span>, your personal shopping assistant
        </p>

        {/* Interactive demo prompt */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-left text-gray-700">
              "Hi there! Try asking me about products, deals, or your orders..."
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            {["Show deals", "Track order", "Find stores"].map((prompt) => (
              <button
                key={prompt}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-all hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Animated call-to-action */}
        <div className="animate-bounce-slow">
          <p className="text-blue-500 font-medium mb-2 flex items-center justify-center gap-2">
            <ChevronDown className="w-5 h-5" />
            <span>Click below to chat with Milo</span>
            <ChevronDown className="w-5 h-5" />
          </p>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default Index;
