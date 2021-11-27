import Message from './models/message.js';
const initData =(ws)=>{
    Messsage.find().sort({created_at:-1}).limit(100).exec((err,res)=>{
        if(err) throw err;
        sendData(['init',res])
    })
}

const sendData = (data,ws) =>{
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload,ws) =>{
    sendData(["status",payload],ws);
}

export {sendData,sendStatus,initData}