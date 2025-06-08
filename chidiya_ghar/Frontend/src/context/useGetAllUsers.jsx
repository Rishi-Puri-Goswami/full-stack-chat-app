import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const token = Cookies.get("jwt");
      if (!token) {
        console.warn("JWT token not found");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get("https://chidyaghar-backend.onrender.com/api/user/allusers", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllUsers(response.data);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
