require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY as string | undefined;
import express from 'express'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'
const jwt = jsonwebtoken
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
app.use(express.json()); 
app.use(cookieParser())

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables");
}
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

    const access_token = jwt.sign({id:result.id},SECRET_KEY)

    const options = {
        httpOnly:true,
        secure:true
    }

    res.cookie("access_token", access_token, options);

    res.json({
      msg: "Account Created",
    });
  });

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