import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Switch, FormControlLabel, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [systemPrompt, setSystemPrompt] = useState<boolean>(false);
  const [sendChatHistory, setSendChatHistory] = useState<boolean>(false);

  useEffect(() => {
    const savedSystemPrompt = localStorage.getItem('systemPrompt');
    const savedSendChatHistory = localStorage.getItem('sendChatHostory');

    if (savedSystemPrompt) {
      setSystemPrompt(JSON.parse(savedSystemPrompt));
    }

    if (savedSendChatHistory) {
      setSendChatHistory(JSON.parse(savedSendChatHistory));
    }
  }, []);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleSystemPromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setSystemPrompt(newValue);
    localStorage.setItem('systemPrompt', JSON.stringify(newValue));
  };

  const handleSendChatHistoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setSendChatHistory(newValue);
    localStorage.setItem('sendChatHostory', JSON.stringify(newValue));
  };

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleSettingsClick}>
        <SettingsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSettingsClose}>
        <MenuItem>
          <FormControlLabel
            control={<Switch checked={systemPrompt} onChange={handleSystemPromptChange} />}
            label="System Prompt"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={<Switch checked={sendChatHistory} onChange={handleSendChatHistoryChange} />}
            label="Send chat history"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
