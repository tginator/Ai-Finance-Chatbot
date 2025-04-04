const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

app.post('/api/chat', (req, res) => {
  console.log('Received POST to /api/chat');
  console.log('Request body:', req.body);

  const message = req.body.message.toLowerCase();
  let reply;

  if (message.includes("budget")) {
    reply = "Try the 50/30/20 budgeting method.";
  } else if (message.includes("compound interest")) {
    reply = "Compound interest is interest on both principal and past interest.";
  } else {
    reply = "Ask me about saving, budgeting or investing!";
  }

  res.json({ reply });
});

app.listen(5001, () => {
  console.log("Backend server running on port 5001");
});
