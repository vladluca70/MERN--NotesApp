const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const port=5000
const mongoURL='mongodb://localhost:27017/testNOTES'
const server=express()

server.use(express.json())
server.use(cors())

mongoose.connect(mongoURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connection established")
}).catch((error)=>{
    console.log("database connection error", error)
})

const noteSchema=new mongoose.Schema({
    name:{type:String, required:true},
    note:{type:String}
})
const noteModel=mongoose.model('Note', noteSchema)

server.post('/login', async(req, res)=>{

})

server.listen(
    port, ()=>{
        console.log(`server is working on port ${port}`)
    }
)