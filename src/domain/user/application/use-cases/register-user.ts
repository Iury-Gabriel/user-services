import bcript from 'bcryptjs';
import User, { PublicUser } from '../../enterprise/entities/User';
import UserRepository from '../../enterprise/repositories/UserRepository';

interface RegisterUserData {
    id: string;
    name: string;
    email: string;
    password: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export default class RegisterUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(data: RegisterUserData): Promise<PublicUser | undefined> {
        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcript.hash(data.password, 10);
        data.password = hashedPassword;
        const user = new User(data.id, data.name, data.email, data.password, data.roleId, data.createdAt, data.updatedAt);
        const savedUser = await this.userRepository.save(user);

        if (!savedUser) {
            throw new Error('User not created');
        }

        return savedUser;
    }
}
