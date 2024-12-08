
import Role from "../entities/Role";

export default abstract class RoleRepository {
    abstract findByRole(roleName: string): Promise<Role | undefined>;
}
