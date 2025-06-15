
// Add chatbot to the root page
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Flipkart Chatbot Demo</h1>
        <p className="text-xl text-muted-foreground">Click the Rufus chat bubble below to start a conversation. Try voice input!</p>
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
