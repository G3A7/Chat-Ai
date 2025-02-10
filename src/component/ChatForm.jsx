import { useRef } from "react";

function ChatForm({ setChatHistory, chatHistory, generateBotResponse }) {
  const inputRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    inputRef.current.value = "";
    // عشان اسمع في الشاشه علي طوول
    setChatHistory((chat) => [...chat, { role: "user", text: userMessage }]);
    setTimeout(() => {
      setChatHistory((chat) => [...chat, { role: "model", text: "thinking..." }]);
      console.log(chatHistory);
      //   عشان مش متزامنه
        generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 500);
  }
  return (
    <>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="message..."
          className="message-input"
          required
        />
        <button>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </form>
    </>
  );
}

export default ChatForm;
