import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation || !selectedConversation._id) {
      console.error("No conversation selected.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `https://chidyaghar-backend.onrender.com/api/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true, 
        }
      );

      
      setMessage([...messages, res.data]);
    } catch (error) {
      console.error("Error in sending message:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
