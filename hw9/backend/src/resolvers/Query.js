// import {checkUser, newUser, makeName, checkChatBox, newChatBox,newMessage, checkMessage} from './utility.js'

// const Query = {
//   //chatBox(name1: String, name2: String): ChatBox!

//   async chatBox(parent, { name1, name2 }, { db }, info) {
//     if (name1 && name2) {
//       //specify 2人對話

//       const chatBoxName = makeName(name1, name2);
//       let chatBox = await checkChatBox(db, chatBoxName, "QueryChatBox");
//       if (!chatBox) throw new Error("ChatBox DNE");
//       return chatBox;
//     }

//     if (!name1 && name2) {
//       return db.ChatBoxModel.filter((chatBox) => {
//         return chatBox.name.toLowerCase().includes(name2.toLowerCase());
//       });
//     }

//     if (name1 && !name2) {
//       return db.ChatBoxModel.filter((chatBox) => {
//         return chatBox.name.toLowerCase().includes(name1.toLowerCase());
//       });
//     }
//     else{
//       return db.ChatBoxModel; //真的可以整坨回傳嗎?
//     }
//   },
// };

// export default Query;

import {checkUser,newUser,makeName,checkChatBox,newChatBox,newMessage,checkMessage} from "./utility.js"
const Query = {
  async chatBox(parent, {name1,name2}, { db }, info){
    if (!name1 || !name2)
    throw new Error("Missing chatBox name for CreateChatBox");
    const chatBoxName = makeName(name1, name2);
    if (!(await checkChatBox(db,chatBoxName, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox: " + chatBoxName);
    }


    let chatBox = 
      await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox)  console.log("User does not exist for CreateChatBox: " + chatBoxName);
    else  return chatBox;
  },
};

export { Query as default };

