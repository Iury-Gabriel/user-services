
import User, { PublicUser } from "../entities/User";

export default abstract class UserRepository {
    abstract save(user: User): Promise<PublicUser | undefined>;

    abstract findById(id: string): Promise<User | undefined>;

    abstract findByEmail(email: string): Promise<User | undefined>;

    abstract getAll(): Promise<PublicUser[] | undefined>;

    abstract deleteUser(id: string): Promise<PublicUser | undefined>;
}
