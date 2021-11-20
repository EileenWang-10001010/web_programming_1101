import express from 'express'
import {genNumber,getNumber} from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
  }

router.post('/start',(_,res)=>{
    genNumber()
    res.json({msg: 'The game has started.'})
})

router.get('/guess',(req,res)=>{
    const number = getNumber()

    const guessed = roughScale(req.query.number, 10);
    
    if(!guessed || guessed<1 || guessed>100){
        res.status(406).send({msg:'Not a legal number.'})
        //console.log(res.statusCode);
    }else if(number === guessed){
        res.send({msg:'Equal'})
    }else if(number < guessed){
        res.send({msg:'Smaller 猜小一點'})
    }else{
        res.send({msg:'Bigger 猜大一點'})
    }
})

router.post('/restart',(_,res)=>{
    genNumber()
    res.json({msg: 'The game has restarted.'})
})

export default router