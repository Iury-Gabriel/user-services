import express, { Request, Response } from "express";
import UserRepositoryImpl from "./infrastructure/database/UserRepositoryImpl";
import RegisterUser from "./domain/user/application/use-cases/register-user";
import UserController from "./presentation/controllers/UserController";
import AuthenticateUser from "./domain/user/application/use-cases/authenticate-user";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUser(userRepository);
const authenticateUserUseCase = new AuthenticateUser(userRepository, 'secret'); 
const userController = new UserController(registerUserUseCase, authenticateUserUseCase);

app.post('/users', (req: Request, res: Response) => userController.register(req, res));
app.post('/login', (req: Request, res: Response) => userController.login(req, res));

app.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong'
    });
});

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log("Server is running on http://localhost:3002");
});