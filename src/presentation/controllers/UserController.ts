
import { Request, Response } from 'express';
import RegisterUser from '../../domain/user/application/use-cases/register-user';
import AuthenticateUser from '../../domain/user/application/use-cases/authenticate-user';

export default class UserController {
    private registerUserUseCase: RegisterUser;
    private authenticateUserUseCase: AuthenticateUser;  

    constructor(registerUserUseCase: RegisterUser, authenticateUserUseCase: AuthenticateUser) {
        this.registerUserUseCase = registerUserUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.registerUserUseCase.execute(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.authenticateUserUseCase.execute(req.body);
            res.status(200).json(user); 
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
        }
}
