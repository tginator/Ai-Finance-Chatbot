import React, { useState } from 'react';

function App() {

const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const sendMessage = async () => {
  if (!input.trim()) return;

// Add user's message to chat
const userMessage = { sender: 'You', text: input };
setMessages([...messages, userMessage]);

try {
const res = await fetch('http://localhost:5001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input })
});

const data = await res.json();
const botMessage = { sender: 'Bot', text: data.reply };
setMessages(prev => [...prev, botMessage]);


} catch (error) {
  setMessages(prev => [...prev, { sender: 'Bot', text: 'Error talking to server.' }]);
}

setInput('');

};

return (
  <div style={{ padding: 20, fontFamily: 'Arial' }}>
    <h2> 💬 AI Finance Chatbot </h2>

    <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10, marginBottom: 10}}>
      {messages.map((msg, index) => (
        <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
      ))}
    </div>

    <input
      type="text"
      value={input}
      placeholder="Ask something about money..."
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      style={{ width: '70%', padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10}}>Send</button>
      </div>
);
}

export default App;