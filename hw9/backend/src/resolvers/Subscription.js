// type Subscription {
//   message(from: String!, to: String!): MessageSubscriptionPayload!
// }

// type MessageSubscriptionPayload {
//   mutation: MutationType!
//   message: Message! return 對話訊息~ 要先找chatBox(from,to)? 或找MessageModel.sender?
// }

import {checkUser, newUser, makeName, checkChatBox, newChatBox,newMessage, checkMessage} from './utility.js'

const Subscription = {
  message:{

    async subscribe(parent, { from, to }, { db, pubsub }, info){

      const name = makeName(from,to);
      const chatBox = await db.ChatBoxModel.findOne({name});
      if(!chatBox) {
        await newChatBox(db, chatBoxName);
      }

      return pubsub.asyncIterator(`chatBox ${name}`);
    }
  },
  }
  
  export default Subscription;