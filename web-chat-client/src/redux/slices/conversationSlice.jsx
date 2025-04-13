import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const messageToUpdate = state.messages.find(
        (msg) => msg._id === messageId
      );
      if (messageToUpdate) {
        messageToUpdate.status = status;
      }
    },
  },
});

export const { setSelectedConversation, setMessages, updateMessageStatus } =
  conversationSlice.actions;

export default conversationSlice.reducer;

// =========== without indicator ====================

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   selectedConversation: null,
//   messages: [],
// };

// const conversationSlice = createSlice({
//   name: "conversation",
//   initialState,
//   reducers: {
//     setSelectedConversation: (state, action) => {
//       state.selectedConversation = action.payload;
//     },
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//   },
// });

// export const { setSelectedConversation, setMessages } =
//   conversationSlice.actions;

// export default conversationSlice.reducer;
