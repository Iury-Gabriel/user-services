export interface PublicUser {
    id: string;
    name: string;
    email: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export default class User {
    private id: string
    private name: string
    private email: string
    private password: string
    private roleId: string
    private createdAt: Date
    private updatedAt: Date

    constructor(id: string, name: string, email: string, password: string, roleId: string, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.roleId = roleId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    public getRoleId(): string {
        return this.roleId
    }

    public getCreatedAt(): Date {
        return this.createdAt
    }

    public getUpdatedAt(): Date {
        return this.updatedAt
    }

    toJSON(): PublicUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            roleId: this.roleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}