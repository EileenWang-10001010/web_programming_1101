


import express from 'express' //new
import cors from 'cors' //new
import router from './routes/index.js' //new

const app =express()
app.use(cors())
app.use(express.json()); //post 接request
app.use('/api',router)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('Server is up on port ' + port +'.')
})


