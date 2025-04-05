import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { getUsers } from "../../api/users";
import logo from "../../assets/logo.png";
import { useAuth } from "../../providers/AuthProviders";

const Home = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch Users from Backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Call the getUsers function
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userName) => {
    setSelectedUser(userName); // Set the selected user
  };

  const handleSendMessage = () => {
    console.log("Send message to", selectedUser, ":", newMessage);
    setNewMessage(""); // Clear the input field
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedUser
              ? users.find((user) => user.name === selectedUser).name
              : "Select a user"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.email}
            </Typography>
          ) : null}
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <List>
              {users.map((use, index) => (
                <ListItem
                  sx={{ cursor: "pointer" }}
                  button
                  key={index}
                  onClick={() => handleUserClick(use.name)}
                >
                  <ListItemText primary={use.name} secondary={use.email} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Chat Messages */}
        <Box
          sx={{ p: 3, mt: 8, height: "calc(100vh - 128px)", overflowY: "auto" }}
        >
          {selectedUser ? (
            <>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Toolbar />
              <img src={logo} alt="logo" />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Select a user from the sidebar to start chatting.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
