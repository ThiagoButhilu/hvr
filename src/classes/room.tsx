export class Room {
    private id: number;
    private name: string;
    private image360: string;

    constructor(
        id: number,
        name: string,
        image360: string
    ) {
        this.id = id;
        this.name = name;
        this.image360 = image360;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getImage360(): string {
        return this.image360;
    }

    public updateName(name: string): void {
        this.name = name;
    }   

    public updateImage360(image360: string): void {
        this.image360 = image360;
    }
    
    public setName(name: string): void {
        this.name = name;
    }

    public setImage360(image360: string): void {
        this.image360 = image360;
    }
     
}