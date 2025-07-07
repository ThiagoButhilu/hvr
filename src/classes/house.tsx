
import { Room } from "./room";

interface address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export class House {
    private rooms: Room[];
    private name: string;
    private code: string;
    private status: number;
    private id: number;
    private thumbnail: string;
    private address: address;
    private views: number;
    private date: Date;

    constructor(id: number, code: string, name: string, thumbnail: string, address: address) {
        this.rooms = [];
        this.id = id;
        this.code = code;
        this.name = name;
        this.thumbnail = thumbnail;
        this.address = address;
        this.status = 0; // 0: draft, 1: published, 2: reserved
        this.views = 0;
        this.date = new Date();
    }

    public getViews(): number {
        return this.views;
    }
    
    public incrementViews(): void {
        this.views++;
    }

    public getDate(): Date {
        return this.date;
    }

    public addRoom(room: Room): void {
        this.rooms.push(room);
    }

    public getStatus(): number {
        return this.status;
    }

    public getCode(): string {
        return this.code;
    }

    public setStatus(status: number): void {
        if (status >= 0 && status <= 2) {
            this.status = status;
        } else {
            throw new Error("Status inválido. Deve ser 0, 1 ou 2.");
        }
    }

    public getStatusLabel(): string {
        switch (this.status) {
            case 0:
                return "Rascunho";
            case 1:
                return "Publicado";
            case 2:
                return "Reservado";
            default:
                return "all";
        }
    }

    public getRooms(): Room[] {
        return this.rooms;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): number {
        return this.id;
    }

    public getThumbnail(): string {
        return this.thumbnail;
    }

    public getAddress(): address {
        return this.address;
    }

     public updateCode(code: string): void { //update code

        this.code = code;   
    }

    public updateName(name: string): void {
        this.name = name;
    }

    public updateThumbnail(thumbnail: string): void {
        this.thumbnail = thumbnail;
    }

    public updateAddress(address: address): void {
        this.address = address;
    }

    public removeRoom(roomId: number): void {
        this.rooms = this.rooms.filter(room => room.getId() !== roomId);
    }
}
