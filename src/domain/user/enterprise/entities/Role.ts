export default class Role {
    private id: string
    private name: string
    private permissons: string[]
    private createdAt: Date
    private updatedAt: Date

    constructor(id: string, name: string, permissons: string[], createdAt: Date, updatedAt: Date) {
        this.id = id
        this.name = name
        this.permissons = permissons
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}