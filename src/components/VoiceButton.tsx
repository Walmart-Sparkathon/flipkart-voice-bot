
import React from "react";
import { Mic, MicOff } from "lucide-react";

type VoiceButtonProps = {
  listening: boolean;
  onClick: () => void;
  disabled?: boolean;
};

const VoiceButton: React.FC<VoiceButtonProps> = ({ listening, onClick, disabled }) => (
  <button
    className={
      `flex items-center justify-center hover:bg-blue-100 rounded-full p-2 transition-colors border border-blue-200 ml-1` +
      (listening ? " bg-yellow-200" : " bg-white")
    }
    onClick={onClick}
    aria-label={listening ? "Stop voice input" : "Start voice input"}
    disabled={disabled}
    type="button"
    tabIndex={0}
  >
    {listening ? (
      <MicOff className="h-5 w-5 text-yellow-500 animate-pulse" />
    ) : (
      <Mic className="h-5 w-5 text-blue-500" />
    )}
  </button>
);

export default VoiceButton;
