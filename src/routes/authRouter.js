import { Router } from "express";
import { cadastro } from "../controllers/authController.js";
import schemaValidation from "../middlewares/schemaValidationMiddleware.js";
import cadastroSchema from "../schemas/cadastroSchema.js";


const authRouter = Router()

authRouter.post('/signup', schemaValidation(cadastroSchema), cadastro)

export default authRouter