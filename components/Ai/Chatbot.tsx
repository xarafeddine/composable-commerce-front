import useProductsStore from "@/lib/store";
import { useState, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";

function Chatbot() {
  // const [messages, setMessages] = useState<{ role: string; content: string }[]>(
  //   []
  // );
  const { chatbotMessages, setChatbotMessages } = useProductsStore(
    (state) => state
  );
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }

    const userMessage = { role: "user", content: input };

    const newMessages = [...chatbotMessages, userMessage];
    setChatbotMessages(userMessage);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    // setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    // Send the user message to the backend for processing
    // You can replace this with your own logic to handle user messages
    // and receive responses from the chatbot
    handleUserMessage(last10messages);
  };

  const handleUserMessage = async (
    messages: { role: string; content: string }[]
  ) => {
    setLoader(true);

    try {
      // Send the user message to your chatbot API endpoint
      const response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Error fetching response from chatbot API");
      }

      const { reply } = await response.json();
      const newChatbotMessage = { role: "assistant", content: reply };

      setChatbotMessages(newChatbotMessage);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="chatbot-container fixed bottom-0 right-0 p-3 bg-gray-100">
      <div className="flex flex-col h-full p-4 overflow-y-auto bg-white rounded shadow">
        <div className="flex-grow mb-4">
          {chatbotMessages.map((message, index) => {
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
          {loader && (
            <div className="flex flex-row gap-1 mb-2">
              <span className="font-bold mt-2">Bot:</span>

              <div className="bg-zinc-50 p-2 text-black rounded">
                <LoaderIcon />
              </div>
            </div>
          )}
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
