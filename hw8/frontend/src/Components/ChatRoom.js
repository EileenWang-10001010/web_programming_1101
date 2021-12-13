//import { useState,useEffect,useRef } from 'react'

import { Button, Input,Tag, message } from 'antd'

import styled from 'styled-components'
import Title from "./Title.js"

const ChatRoom = (props)=>{
    return (
        <>
          <Title>
            <h1>{props.me}'s Chat Room</h1>
            <Button type="primary" danger onClick={()=>{
              //props.clearMessages;
              console.log(props.clearMessages)}
              
            }>
              Clear
            </Button>
          </Title>
    
          <div className="App-messages">
            
            {props.messages.length === 0 ? (
              <p style={{ color: '#ccc' }}> No messages... </p>
            ) : (
                props.messages.map(({ name, body }, i) => (
                <p className="App-message" key={i}>
                  <Tag color="blue">{name}</Tag> {body}
                </p>
              ))
            )}
          </div>
    
          {/* <Input
            // onKeyDown={(e) =>
            // {if(e.key==='Enter'){
            //   props.bodyRef.current.focus();
            // }}}
            placeholder="Username"
            value={props.me}
            onChange={(e) => props.setUsername(e.target.value)}
            style={{ marginBottom: 10 }}
          ></Input> */}
    
          <Input.Search
            ref={props.bodyRef}
            value={props.body}
            onChange={(e) => props.setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
              //if(!msg || !props.username)
              if(!msg)
              {
                props.displayStatus({
                  type:'error',
                  msg: 'Please enter a username and a message body.'
                })
                return
              }
              props.sendMessage({ name: props.me, body: msg })
              props.setBody('')
            }}
          ></Input.Search>
        </>
      )
}



export default ChatRoom
