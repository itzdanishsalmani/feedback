import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
app.use(express.json()); 

app.use(cors())

app.get('/', async(req,res)=>{
    prisma.user.create
    res.send("server is running")
})

app.post('/user', async(req,res)=>{
    const { username,email,password } = req.body;

    console.log(username,email,password)

    const result = await prisma.user.create({
        data:{
            username:username,
            email:email,
            password:password,
        }
    })

    res.json({
        result
    })
})

app.post('/createspace', async(req,res)=>{
    const {userId, spacename, title, description, questions} = req.body;
    console.log(userId, spacename, title, description, questions)

    const result = await prisma.userSpace.create({
        data:{
            spacename:spacename,
            title:title,
            description:description,
            questions:questions,
            userId:parseInt(userId)
        },
    })

    res.json({
        result
    })
})

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})