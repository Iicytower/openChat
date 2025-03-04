import React from "react";
import { Box, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";

/**
 * not in use. 
 * to remove in the future
 */

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: '20vw', backgroundColor: "#202123", color: "#fff", height: "90vh", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chat History
      </Typography>
      <List>
        {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={chat} />
            </ListItem>
            <Divider sx={{ backgroundColor: "#444" }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
