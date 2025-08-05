const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const port=5000
const server=express()

server.use(express.json())
server.use(cors())

server.listen(
    port, ()=>{
        console.log(`server is working on port ${port}`)
    }
)