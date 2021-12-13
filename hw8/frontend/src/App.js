import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Button, Input, Tag, message } from "antd";
import useChat from "./useChat";
import SignIn from "./Containers/signIn.js";
import ChatRoom from "./Components/ChatRoom.js";

const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedMe=localStorage.getItem(LOCALSTORAGE_KEY);
  //define states and methods
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [username, setUsername] = useState("");
  const [body, setBody] = useState(""); // textBody

  const [me, setMe] = useState(savedMe || "");
  const [signin, setSignedIn] = useState(false);

  const bodyRef = useRef(null);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 0.5, //why duration?
      };
      switch (type) {
        case "success":
          message.success(content); //antd component
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    displayStatus(status);
    if(signin){
      localStorage.setItem(LOCALSTORAGE_KEY,me)
    }
  }, [status,signin,me]); //每次re-render後

  return (
    <div className="App">
      {signin === true ? (
        <ChatRoom
          me={me}
          messages={messages}
          sendMessage={sendMessage}
          clearMessages={clearMessages}
          username={username}
          setUsername={setUsername}
          body={body}
          setBody={setBody}
          bodyRef={bodyRef}
        />
      ) : (
        <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>
      )}
    </div>
  );
}

export default App;
