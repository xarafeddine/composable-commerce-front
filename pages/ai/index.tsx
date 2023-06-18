// "use client";

// import { useChat } from "ai/react";

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.length > 0
//         ? messages.map((m) => (
//             <div key={m.id} className="whitespace-pre-wrap">
//               {m.role === "user" ? "User: " : "AI: "}
//               {m.content}
//             </div>
//           ))
//         : null}

//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    try {
      // Send user message to the backend API
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const response = await axios.post("/api/ai/chatbot", {
        message: inputValue,
      });

      // Update the chat messages with the user input and chatbot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: inputValue },
        { role: "bot", content: response.data.reply },
      ]);

      // Clear the input field
      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
