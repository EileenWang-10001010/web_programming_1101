import WebSocket from 'ws';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import Message from './models/message';
import {sendData,sendStatus} from './wssConnect'; 

dotenv.config();

if(!process.env.MONGO_URL){
  console.error("Missing MONGO_URL!")
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mongoose.connection

const broadcastMessage =(data,status)=>{
  wss.clients.forEach((client)=>{
    sendData(data,client);
    sendStatus(status,client);
  })
}

db.once('open', () => {
    console.log('MongoDB connected!')

    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
          const { data } = byteString
          const [task, payload] = JSON.parse(data)
          console.log([task, payload]);
          switch (task) {
            case 'init':{
              //
              break;
            }
            case 'input': {
              const { name, body } = payload
              const message
                = new Message({ name, body })
              try { await message.save();
              } catch (e) { throw new Error
                ("Message DB save error: " + e);
              }
              console.log("message saved")
              broadcastMessage(['output', [payload]],{type: 'success',msg: 'Message sent.'
              });
              //sendData(['output', [payload]],ws) //fixed
              //sendStatus({ //fixed
              //  type: 'success',
              //  msg: 'Message sent.'
              //},ws)
            break;}

            case 'clear':{
              Message.deleteMany({},()=>{
                sendData(['cleared']);
                sendStatus({type:'info', msg: 'Message cache cleared.'}); //? ,ws
              })
              break;
            }
            default: break;
          
        }}})
    
    const PORT = process.env.port || 4000
  server.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
