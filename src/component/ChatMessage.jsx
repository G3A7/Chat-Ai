/* eslint-disable react/prop-types */
function ChatMessage({ chat }) {
  return (
    <>
      <div className={`message ${chat.role == "model" ? "bot" : "user"}-message`}>
        {chat.role == "model" && (
          <div>
            <i className="fa-solid fa-robot"></i>
          </div>
        )}
        <p className="message-text">{chat.text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
