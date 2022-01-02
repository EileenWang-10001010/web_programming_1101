import { useState,useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql/index.js"; // /index.js ?
import { Button, Input, Tabs } from "antd";
import styled from "styled-components";
import Title from "../Components/Title";

import ChatBox from "./ChatBox";
//import ChatModal from "./ChatModal";
import AddModal from "./AddModal"
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: flex;
`;


const ChatRoom = ({me, displayStatus}) =>{
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox();
    const [modalVisible, setModalVisible] = useState(false);
    const addRef = useRef();

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const addChatBox = () =>{
        setModalVisible(true);
    };

    const onCancel = ()=>{
        setModalVisible(false);
    }


    return(
        <>
        <Title>
            <h1>{me}'s Chat Room</h1>
            <Button type="primary" danger>
                {" "}
                {/*onClick={clearMessages} */}
                Clear
            </Button>
        </Title>
        <Wrapper
            tabBarStyle={{height:"36px"}}
            type="editable-card"
            activeKey={activeKey}
            onChange={(key)=>{setActiveKey(key);}}
            onEdit={(targetKey, action)=>{
                if(action === "add") addChatBox();
                else if(action === "remove") {
                    setActiveKey(removeChatBox(targetKey,activeKey));};
            }}
        >
            {chatBoxes.map((friend)=>(
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
                <ChatBox me={me} friend={friend} key={friend} />
            </Tabs.TabPane>))}
                
        
        </Wrapper>

<AddModal
        visible={modalVisible}
        onCancel={onCancel}
        
        onCreate={async ({name})=>{
            await startChat({variables:{
                name1: me,
                name2: addRef.current.state.value, 
            },}
            );
            const friend = addRef.current.state.value;
            //if(!chatBoxes.includes(friend))
            createChatBox(friend);
            
            
        //console.log(addRef.current.state.value);
        setModalVisible(false);
        }}
        
        inputRef={addRef}
      >

    <ChatBox me={me} friend={activeKey} />
    </AddModal>

    

        <Input.Search
        enterButton="Send"
        placeholder="Type a message here..."
        onChange={(e)=>{
            //console.log(e.target.value);
            setMessageInput(e.target.value);
            }
        }
        onSearch={(msg)=>{

            if(!msg){
                displayStatus({
                    type: "error",
                    msg: "Please enter a username and a message body."
                  })
                  return
            }
            if (!activeKey){
                displayStatus({
                  type: "error",
                  msg: "Please open a chatbox."
                })
                return
              }

            sendMessage({variables:{
                from: me,
                to: activeKey,
                message: messageInput, 
            }});
            
            
        }}>
            
        </Input.Search>
        
        </>
    )
}

export default ChatRoom;