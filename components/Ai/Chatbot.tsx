import { useState, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch messages from the backend or initialize with welcome message
    // You can replace this with your own logic to fetch initial messages
    const initialMessages = [
      {
        role: "assistant",
        content:
          "Welcome to our e-commerce platform I am you chatbot assistant!",
      },
    ];
    setMessages(initialMessages);
  }, []);

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    // Send the user message to the backend for processing
    // You can replace this with your own logic to handle user messages
    // and receive responses from the chatbot
    handleUserMessage(input);
  };

  const handleUserMessage = async (message: string) => {
    try {
      // Send the user message to your chatbot API endpoint
      const response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Error fetching response from chatbot API");
      }

      const { reply } = await response.json();
      const chatbotMessage = { role: "chatbot", content: reply };
      setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chatbot-container fixed bottom-0 right-0 p-3 bg-gray-100">
      <div className="flex flex-col h-full p-4 overflow-y-auto bg-white rounded shadow">
        <div className="flex-grow mb-4">
          {messages.map((message, index) => {
            return (
              <div key={index} className="flex flex-row gap-1 mb-2">
                <span className="font-bold mt-2">
                  {message.role === "user" ? "You:" : "Bot:"}
                </span>

                <div
                  className={`${
                    message.role === "user" ? "bg-blue-50 " : "bg-zinc-50"
                  }  p-2 text-black rounded`}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 mr-2 border border-gray-300 rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
