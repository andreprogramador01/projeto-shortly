import { Router } from "express";
import { cadastro, login, getUser } from "../controllers/authController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
import schemaValidation from "../middlewares/schemaValidationMiddleware.js";
import cadastroSchema from "../schemas/cadastroSchema.js";
import loginSchema from "../schemas/loginSchema.js";


const authRouter = Router()

authRouter.post('/signup', schemaValidation(cadastroSchema), cadastro)
authRouter.post('/signin', schemaValidation(loginSchema), login)
authRouter.get('/users/me', authValidation, getUser)

export default authRouter