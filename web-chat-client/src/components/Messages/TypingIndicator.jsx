// TypingIndicator.jsx
import { Box, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../context/AuthContext';
import useTypingIndicator from '../../hooks/useTypingIndicator';

const TypingIndicator = () => {
  const { typingUsers } = useTypingIndicator();
  const { selectedConversation } = useSelector(state => state.conversation);
  const { authUser } = useAuthContext();

  if (!selectedConversation?.participants || !typingUsers || !authUser) {
    return null;
  }

  const typingParticipants = selectedConversation.participants.filter(
    participant => participant._id !== authUser._id && typingUsers[participant._id]
  );

  if (typingParticipants.length === 0) return null;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      mb: 1,
      px: 2,
      opacity: 0.7
    }}>
      <Avatar 
        src={typingParticipants[0].profilePic} 
        sx={{ width: 24, height: 24 }} 
      />
      <Typography variant="caption">
        {typingParticipants[0].username} is typing...
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {[0, 0.2, 0.4].map(delay => (
          <Box
            key={delay}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'text.secondary',
              animation: 'pulse 1s infinite',
              animationDelay: `${delay}s`,
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.3 },
                '50%': { opacity: 1 }
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TypingIndicator;