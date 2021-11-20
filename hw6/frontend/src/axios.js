import axios from 'axios';
const instance = axios.create({baseUrl: 'http://localhost:4000/api/guess'})

const startGame = async ()=>{
    const {data:{msg}} = await instance.post('http://localhost:4000/api/guess/start')
    //msg = "The game has started".
    return msg
}
const guess = async (number) =>{
    try{
        const {data:{msg}} = await instance.get('http://localhost:4000/api/guess/guess',{params: {number}})
        //data: {msg: 'Equal/Smaller/Bigger'}
        
    return msg
    }
    catch(error){ 
        const msg = "Error: "+ number +" is not a valid number (1 - 100)";
        return msg
     }
}
const restart = async ()=>{
    const {data:{msg}} = await instance.post('http://localhost:4000/api/guess/restart')
    //msg = "The game has restarted."
    return msg
}

export {startGame, guess, restart}
