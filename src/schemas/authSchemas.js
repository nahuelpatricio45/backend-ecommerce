import {z} from 'zod'

export const registerSchema = z.object({
    username : z.string({
        required_error : 'El nombre es requerido'
    }),
    email: z.string({
        required_error : "email es requerido"
    }),
    password : z.string({required_error:"Contrase;a es requerida"})
    .min(6,{
        message: "la contrase;a debe tener mas de 6 caracteres"
    })
  
})
export const loginSchema = z.object({
    email: z.string({
        required_error : "email es requerido"
    }).email({message:'email invalido'}),
    password : z.string({required_error:"Contrase;a es requerida"})
    .min(6,{
        message: "la contrase;a debe tener mas de 6 caracteres"
    })
  
})