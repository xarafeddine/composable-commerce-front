import { useState } from "react";

import ChatbotButton from "./ChatbotButton";
import Chatbot from "./Chatbot";

function ChatbotContainer() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChatbot = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div>
      {isOpen && <Chatbot />}
      <ChatbotButton onClick={toggleChatbot} isOpen={isOpen} />
    </div>
  );
}

export default ChatbotContainer;
