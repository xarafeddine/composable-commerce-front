import { MouseEventHandler, useState } from "react";

function ChatbotButton({
  onClick,
  isOpen,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}) {
  return (
    <button
      className={`fixed ${
        isOpen ? "bottom-96 bg-red-500" : "bottom-4 bg-blue-500"
      } right-4 p-2  text-white rounded`}
      onClick={onClick}
    >
      {isOpen ? "Close" : "Open Chatbot"}
    </button>
  );
}

export default ChatbotButton;
