// hooks/useTypingIndicator.js
import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useSelector } from 'react-redux';

const useTypingIndicator = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useSelector(state => state.conversation);
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    // Join conversation room
    socket.emit('joinConversation', selectedConversation._id);

    const handleTyping = ({ userId, isTyping }) => {
      setTypingUsers(prev => ({
        ...prev,
        [userId]: isTyping
      }));
    };

    socket.on('typing', handleTyping);

    return () => {
      socket.off('typing', handleTyping);
      socket.emit('leaveConversation', selectedConversation._id);
    };
  }, [socket, selectedConversation]);

  return { typingUsers };
};

export default useTypingIndicator;