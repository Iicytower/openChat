import React, { useEffect, useState } from 'react';
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField
} from '@mui/material';
import SettingsMenu from './SettingsMenu';

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [systemInput, setSystemInput] = useState("");

  const [isSystemPromptVisible, setIsSystemPromptVisible] = useState(
    JSON.parse(localStorage.getItem('systemPrompt') || 'false')
  );

  useEffect(() => {
    const updateSystemPromptVisibility = () => {
      setIsSystemPromptVisible(JSON.parse(localStorage.getItem('systemPrompt') || 'false'));
    };

    // Listen for storage changes (cross-tab)
    window.addEventListener('storage', updateSystemPromptVisibility);

    // Polling mechanism to detect changes within the same tab
    const interval = setInterval(updateSystemPromptVisibility, 500);

    return () => {
      window.removeEventListener('storage', updateSystemPromptVisibility);
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    setMessages([
      ...messages,
      {
        sender: "user",
        text: JSON.stringify({ systemPrompt: systemInput, userPrompt: userInput }, null, 2)
      },
      { sender: "gpt", text: "Thinking..." }
    ]);
    setUserInput("");
    setSystemInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev.slice(0, -1), { sender: "gpt", text: "Hello! How can I assist you?" }]);
    }, 1000);
  };

  return (
    <Box sx={{ 
      display: "flex",
      flexDirection: "column",
      height: "98vh",
      width: "99vw",
      backgroundColor: "var(--chat-background-color)"
    }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "var(--main-app-color)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Current chat</Typography>
          <SettingsMenu />
        </Toolbar>
      </AppBar>

      {/* Chat Area */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                p: 1.5,
                borderRadius: 2,
                bgcolor: msg.sender === "user" ? "var(--main-app-color)" : "var(--ai-msg-bg-color)",
                color: "var(--chat-text-color)",
              }}
            >
              <Typography>{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input Box */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2, backgroundColor: "var(--chat-input-bg-color)" }}>
        {isSystemPromptVisible && 
          <TextField
            sx={{ input: { color: 'var(--chobjectat-text-color)' } }}
            fullWidth
            variant="outlined"
            placeholder="Type a system prompt..."
            value={systemInput}
            onChange={(e) => setSystemInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        }
        <TextField
          sx={{ input: { color: 'var(--chat-text-color)' } }}
          fullWidth
          variant="outlined"
          placeholder="Type a user prompt..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
