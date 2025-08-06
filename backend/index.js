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
});

server.post('/signup', async(req,res)=>{
    const username=req.body.name
    
    if(!username){
        res.status(400).json({message:"username is required"})
    }
    
    try {
        const usernameExists=await noteModel.findOne({name:username}) 
        if (usernameExists){
            console.log(`${username} already exists in database`)
            return res.status(409).json({message:"username already exists"})
        }

        const newUsername= new noteModel({name:username})
        await newUsername.save()
        console.log(`Username ${username} have just been stored in database`)
        res.status(200).json({message:"username registered"})

    } catch (error) {
        console.error("login server error", error)
        res.status(500).json({message:"internal server error"})
    }
});

server.post('/add-new-note', async(req, res)=>{
    const username=req.body.username
    const newNote=req.body.newNote

    if(!username){
        return res.status(400).json({message:'name is required'})
    }
    if(!newNote){
        return res.status(400).json({message:'note content is required'})
    }

    try {
        const userExists=await noteModel.findOne({name:username})
        if(userExists){
            const newNoteToInsert= new noteModel({name:username, note:newNote})
            await newNoteToInsert.save()
            console.log(`note has just been stored in database`)
            res.status(200).json({message:"note registered"})
        }
        else{
            console.log(`${username} does not exist in database`)
            res.status(404).json({message:"username not found in database"})
        }

    } catch (error) {
        console.error("login server error", error)
        res.status(500).json({message:"internal server error"})
    }
});

server.post('/fetch-notes', async(req,res)=>{
    const username=req.body.username
    if(!username){
        return res.status(400).json({ message: 'username is required' });
    }

    try {
        const userNotes=await noteModel.find({name:username})
        const onlyNotes=userNotes.map(note=>note.note)
        res.status(200).json({ notes: onlyNotes });

    } catch (error) {
        console.error("Error fetching notes", error);
        res.status(500).json({ message: 'internal server error' });
    }
})

server.listen(
    port, ()=>{
        console.log(`server is working on port ${port}`)
    }
)