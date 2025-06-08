import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation || !selectedConversation._id) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `https://chidyaghar-backend.onrender.com/api/message/get/${selectedConversation._id}`,
          {
            withCredentials: true, 
          }
        );
        setMessage(res.data);
      } catch (error) {
        console.error("Error in getting messages:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]); 

  return { loading, messages };
};

export default useGetMessage;
