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
    const {userId, spaceName, Header, Description, Questions} = req.body;
    console.log(userId, spaceName, Header, Description, Questions)

    const result = await prisma.userSpace.create({
        data:{
            spaceName:spaceName,
            Header:Header,
            Description:Description,
            Questions:Questions,
            userId:userId
        },
    })

    res.json({
        result
    })
})

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})