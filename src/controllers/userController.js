// userController.js

import User from "../models/users.models.js";
import bcrypt from "bcryptjs";

import { createAccessToken } from "../libs/jwt.js";
import  jwt  from "jsonwebtoken";

import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => 
{
  const {email , password, username} = req.body 

  try{
const userFound = await User.findOne({email})
if(userFound)
return res.status(400).json(["el email esta en uso"])



    //encriptamos contrase;a
const passwordHash = await bcrypt.hash(password, 10) // hash string aletorio
 //creamos usuario
  const newUser= new User({
    username,
    email,
    password: passwordHash,
  })
  //guardamos bd en json
const userSaved = await newUser.save()
//creacion del token 
const token = await createAccessToken ({id: userSaved._id})
res.cookie('token', token)
res.json({
  id: userSaved._id,
  username: userSaved.username,
  email: userSaved.email,
})
}
 catch(error){
  res.status(500).json({message: error.message})
 }
}
 

export const login = async (req, res) => 
{
  const {email , password} = req.body 

  try{
    //buscamos el usuario a traves del email
const userFound = await User.findOne({email})
if (!userFound)
return res.status(400).json({message:"usuario no encontrado"})

    //comparamos contrase;a
const isMatch = await bcrypt.compare(password, userFound.password) 
if(!isMatch) return res.status(400).json({message:" contrase;a no encontrado"})

//creamos el token con el usuario encontrado
const token = await createAccessToken ({id: userFound._id})

res.cookie('token', token)
res.json({
  id: userFound._id,
  username: userFound.username,
  email: userFound.email,
  cart: userFound.cart
})
}
 catch(error){
  res.status(500).json({message: error.message})
 }
}

export const logout = (req, res) => {
 res.cookie('token', "",{
  expires: new Date(0)
 })
 return res.sendStatus(200)
};

export const profile = async (req , res ) => {
 const userFound = await User.findById(req.user.id)
 if(!userFound) return res.status(400).json({message: "usuario no encontrado"});
 return res.json({
  id: userFound._id,
  username : userFound.username,
 email : userFound.email
 })
}

export const verifyToken = async (req, res) => {
const {token} = req.cookies
console.log(token)
if (!token) return res.send(false);

jwt.verify(token, TOKEN_SECRET, async (error, user)=>{
  if (error) return res.sendStatus(401);

  const userFound = await User.findById(user.id)
  if (!userFound) return res.sendStatus(402);

  return res.json({
id: userFound._id,
username : userFound.username,
email: userFound.email,


  })
})

}