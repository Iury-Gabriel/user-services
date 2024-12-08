import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../enterprise/repositories/UserRepository';
import User, { PublicUser } from '../../enterprise/entities/User';

interface AuthenticateUserData {
    email: string;
    password: string;
}

interface AuthenticatedUser {
    user: PublicUser;
    token: string;
}

function mapUserToPublicUser(user: User): PublicUser {
    return {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roleId: user.getRoleId(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt()
    };
}

export default class AuthenticateUser {
    private userRepository: UserRepository;
    private jwtSecret: string;

    constructor(userRepository: UserRepository, jwtSecret: string) {
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }

    async execute(data: AuthenticateUserData): Promise<AuthenticatedUser | undefined> {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(data.password, user.getPassword());

        if (!passwordMatches) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.getId(), roleId: user.getRoleId() },
            this.jwtSecret,
            { expiresIn: '1h' }
        );

        return {
            user: mapUserToPublicUser(user),
            token
        };
    
    }
}
