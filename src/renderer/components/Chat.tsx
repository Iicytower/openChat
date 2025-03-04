import React, { useState, useEffect } from 'react';
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField
} from '@mui/material';import SettingsIcon from '@mui/icons-material/Settings';

interface Message {
  sender: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sendChatHostory, setsendChatHostory] = useState<boolean>(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedsendChatHostory = localStorage.getItem('sendChatHostory');

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    if (savedsendChatHostory) {
      setsendChatHostory(JSON.parse(savedsendChatHostory));
    }
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }, { sender: "gpt", text: "Thinking..." }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev.slice(0, -1), { sender: "gpt", text: "Hello! How can I assist you?" }]);
    }, 1000);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    localStorage.setItem('darkMode', JSON.stringify(event.target.checked));
  };
  
  const handlesendChatHostoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsendChatHostory(event.target.checked);
    localStorage.setItem('sendChatHostory', JSON.stringify(event.target.checked));
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
          <IconButton edge="end" color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
          >
            <MenuItem>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
                label="Dark Mode"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Switch checked={sendChatHostory} onChange={handlesendChatHostoryChange} />}
                label="Send chat history"
              />
            </MenuItem>
          </Menu>
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
      <Box sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "var(--chat-input-bg-color)" }}>
        <TextField
          sx={{ input: { color: 'var(--chat-text-color)' } }}
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
