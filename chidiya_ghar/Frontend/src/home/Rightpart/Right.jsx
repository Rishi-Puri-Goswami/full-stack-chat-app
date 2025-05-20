import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost  drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen bg-[#1b1b1b] items-center justify-center">
          <h1 className="text-center">
            Welcome to  <span className="font-semibold text-xl text-blue-700" >
            chidiya_ghar {","}
              </span> 
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            This is  <span className="font-semibold text-xl text-red-700" >
            MEARN
              </span> stack application  
              <br /> 
              <span> DEVELOPER <span className="font-semibold text-xl text-red-700" >
             {"<%="}RISHI{"%>"}
              </span></span>
          </h1>
        </div>
      </div>
    </>
  );
};
