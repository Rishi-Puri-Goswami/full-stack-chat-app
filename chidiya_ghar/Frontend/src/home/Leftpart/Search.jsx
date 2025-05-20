import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

import { LuUserRoundSearch } from "react-icons/lu";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div class=" mb:w-[10vw] max-w-sm min-w-[200px] mb-[4vh] mt-[3vh] ">

    <div class="relative">
  <form onSubmit={handleSubmit} >
  
      <input
      onChange={(e) => setSearch(e.target.value)}
      value={search}
        class="w-full bg-transparent placeholder:text-slate-400 text-[#a4837b] text-sm border border-[#594641] rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-[#a4837b] hover:border-[#a4837b] shadow-sm focus:shadow"
        placeholder="search user" 
        />
      <button
        class="absolute top-1 right-1 flex items-center rounded border-[#594641] py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:border-[#a4837b] focus:shadow-none active:bg-slate-700 hover:border-[#a4837b] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
          <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
   
        Search
      </button> 
        </form>
    </div>
  </div>
  );
}

export default Search;

