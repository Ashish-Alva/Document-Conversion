//  Load learned data
function getLearnedData() {
  return JSON.parse(localStorage.getItem("learnedQA") || "[]");
}
 
function saveLearnedData(data) {
  localStorage.setItem("learnedQA", JSON.stringify(data));
}
 
//  Toggle Chat
function toggleChat() {
  const chat = document.getElementById("chatContainer");
  chat.style.display =
    chat.style.display === "flex" ? "none" : "flex";
}
window.toggleChat = toggleChat;
 
//  Send Message
function sendMessage() {
  const inputField = document.getElementById("userInput");
  const rawInput = inputField.value.trim();
  if (!rawInput) return;
 
  const chatbox = document.getElementById("chatbox");
 
  //  User message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = rawInput;
  chatbox.appendChild(userMsg);
 
  const normalized = rawInput.toLowerCase().trim();
 
  let response = "";
  let found = false;
 
  // =========================
  //  LEARNING MODE
  // =========================
  if (normalized.startsWith("/learn")) {
    try {
      const parts = rawInput.replace("/learn", "").split("|");
 
      if (parts.length !== 2) {
        response = " Use format: /learn question | answer";
      } else {
        const question = parts[0].trim();
        const answer = parts[1].trim();
 
        if (!question || !answer) {
          response = " Both question and answer required!";
        } else {
          const learnedData = getLearnedData();
 
          learnedData.push({
            question: question.toLowerCase().trim(),
            answer: answer.trim(),
          });
 
          saveLearnedData(learnedData);
 
          response = " Learned successfully!";
        }
      }
    } catch (err) {
      response = " Error while learning.";
    }
  }
 
  // =========================
  //  NORMAL RESPONSE
  // =========================
  else {
    //  1. CHECK LEARNED DATA FIRST (HIGH PRIORITY)
    const learnedData = getLearnedData();
 
    for (const item of learnedData) {
      if (!item) continue;
 
      const storedQ = (item.question || "").toLowerCase().trim();
      if (!storedQ) continue;
 
      //  EXACT MATCH (best)
      if (normalized === storedQ) {
        response = item.answer;
        found = true;
        break;
      }
 
      //  PARTIAL MATCH (fallback)
      if (!found && normalized.includes(storedQ)) {
        response = item.answer;
        found = true;
      }
    }
 
    //  2. CHECK DEFAULT QA DATA
    if (!found && window.defaultQaData) {
      for (const item of window.defaultQaData) {
        if (!item) continue;
 
        //  KEYWORD MATCH
        if (item.keywords && Array.isArray(item.keywords)) {
          for (const keyword of item.keywords) {
            const key = keyword.toLowerCase().trim();
 
            // safer match (word-based)
            if (
              normalized === key ||
              normalized.includes(" " + key) ||
              normalized.includes(key + " ")
            ) {
              response = item.answer;
              found = true;
              break;
            }
          }
        }
 
        if (found) break;
 
        //  OPTIONAL QUESTION MATCH
        const storedQ = (item.question || "").toLowerCase().trim();
 
        if (storedQ) {
          if (normalized === storedQ) {
            response = item.answer;
            found = true;
            break;
          }
 
          if (!found && normalized.includes(storedQ)) {
            response = item.answer;
            found = true;
          }
        }
      }
    }
 
    //  NOT FOUND
    if (!found) {
      response =
        "I don’t know that yet \nTeach me using:\n/learn question | answer";
    }
  }
 
  //  BOT RESPONSE
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = response;
    chatbox.appendChild(botMsg);
 
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 300);
 
  inputField.value = "";
}
window.sendMessage = sendMessage;
 
//  CLEAR CHAT
function clearChatHistory() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";
 
  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.textContent = "Chat cleared. Ask anything.";
  chatbox.appendChild(botMsg);
}
window.clearChatHistory = clearChatHistory;
 
//  ATTACH EVENTS
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearChatBtn");
 
  if (clearBtn) {
    clearBtn.onclick = window.clearChatHistory;
  }
});