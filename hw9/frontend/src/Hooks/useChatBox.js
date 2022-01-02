import { useState } from "react";

const useChatBox = () => {
  // chatBoxes is an array of strings as friends
  const [chatBoxes, setChatBoxes] = useState([]);

  const createChatBox = (friend) => {
    if (chatBoxes.some((name) => name === friend.id)) //id?
      throw new Error(friend + "'s chat box has already opened.");
    setChatBoxes([...chatBoxes, friend]);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.indexOf(activeKey); //if notFound, return -1
    const newChatBox = chatBoxes.filter((name) => name !== targetKey); //WT delete targetKey
    setChatBoxes(newChatBox);

    return activeKey //if activeKey DNE, return ""
      ? activeKey === targetKey // if activeKey Exist && !== targetKey, return activeKey
        ? index === 0 // if activeKey Exist && === targetKey && index !==0 , return chatBoxes[index - 1]
          ? ""// if activeKey Exist && === targetKey && index === 0 , return ""
          : chatBoxes[index - 1]
        : activeKey
      : "";
  };
  return {chatBoxes,createChatBox, removeChatBox};
};

export default useChatBox;
