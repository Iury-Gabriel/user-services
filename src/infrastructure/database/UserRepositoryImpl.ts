
import { PrismaClient } from '@prisma/client';
import User, { PublicUser } from '../../domain/user/enterprise/entities/User';
import UserRepository from '../../domain/user/enterprise/repositories/UserRepository';


export default class UserRepositoryImpl extends UserRepository {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async save(user: User): Promise<PublicUser | undefined> {
        const newUser = await this.prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                roleId: user.getRoleId(),
                createdAt: user.getCreatedAt(),
                updatedAt: user.getUpdatedAt(),
            },
        });
    
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            roleId: newUser.roleId,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
    }

    async getAll(): Promise<PublicUser[] | undefined> { 
        const users = await this.prisma.user.findMany();

        if (!users) {
            throw new Error('Users not found');
        }
        
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            createdAt: user.createdAt, 
            updatedAt: user.updatedAt
        }));
    }
    

    async findById(id: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? new User(user.id, user.name, user.email, user.password, user.roleId, user.createdAt, user.updatedAt) : undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        return user ? new User(user.id, user.name, user.email, user.password, user.roleId, user.createdAt, user.updatedAt) : undefined;
    }

    async deleteUser(id: string): Promise<PublicUser | undefined> { 
        const deletedUser = await this.prisma.user.delete({
            where: { id },
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true, roleId: true },
        });

        if (!deletedUser) {
            throw new Error('User not found');
        }

        return {
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email,
            roleId: deletedUser.roleId,
            updatedAt: deletedUser.updatedAt,
            createdAt: deletedUser.createdAt,
        };
    }
}
