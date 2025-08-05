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
    const username=req.body.name
    if(!username){
        res.status(400).json({message:"username is required"})
    }

    try {
        const userExists= await noteModel.findOne({name:username})
        if(userExists){
            console.log(`${username} exists in database, log in succesful`)
            res.status(200).json({message:"Log in succesful"})
        }
        else{
            console.log(`${username} does not exist in database`)
            res.status(404).json({message:"username not found in database"})
        }
    } catch (error) {
        console.error("login server error", error)
        res.status(500).json({message:"internal server error"})
    }
})

server.listen(
    port, ()=>{
        console.log(`server is working on port ${port}`)
    }
)