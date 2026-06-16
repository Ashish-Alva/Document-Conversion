// frontend/src/components/chatbot/Chatbot.jsx
import React, { useEffect } from "react";
import "./style.css";
import "./qa-data.js";
import "./script.js";

export default function Chatbot() {
  useEffect(() => {
    // Trigger DOMContentLoaded logic inside script.js
    document.dispatchEvent(new Event("DOMContentLoaded"));
  }, []);

  return (
    <>
      <div id="chatButton" onClick={() => window.toggleChat()}>Q/A💬</div>
      <div id="chatContainer" >
        <div id="chatHeader">Assistant 🤖</div>
        <div id="chatbox"></div>
        <div id="suggestions"></div>

        <div id="chatActions">
          <button id="clearChatBtn" type="button" onClick={() => window.clearChatHistory()}>
             Clear Chat
          </button>
        </div>


        <div id="inputArea">
          <input type="text" id="userInput" placeholder="Ask or use: /learn question | answer" />
          <button onClick={() => window.sendMessage()} className="btn">Send</button>
        </div>
      </div>
    </>
  );
}
