import { useEffect, useRef, useState } from "react";
import ChatForm from "./component/ChatForm";
import ChatMessage from "./component/ChatMessage";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  useEffect(() => {
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);
  async function generateBotResponse(chat) {
    const updateHistory = (text) => {
      setChatHistory((chat) => [
        ...chat.filter((msg) => msg.text != "thinking..."),
        { role: "model", text },
      ]);
    };
    const history = chat.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.error.message || "something Went Error");
      console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <div
        id="chatbot-toggler"
        onClick={() => {
          setShowChatbot(!showChatbot);
        }}
      >
        <div>
          <i className="fa-solid fa-message"></i>
        </div>
        <div>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <div>
              <i className="fa-solid fa-robot"></i>
            </div>
            <h2 className="logo-text">ChatBot</h2>
          </div>
          <button
            onClick={() => {
              setShowChatbot(!showChatbot);
            }}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
            <div>
              <i className="fa-solid fa-robot"></i>
            </div>
            <p className="message-text">
              Hey There 🤗 <br /> How can i help you today?
            </p>
          </div>

          {chatHistory.map((chat, idx) => {
            return <ChatMessage key={idx} chat={chat} />;
          })}
        </div>
        <div className="chat-footer">
          <ChatForm
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            chatHistory={chatHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
