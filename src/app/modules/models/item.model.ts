export class Item {
    static nextId: number = 1;
    id: number;
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.id = Item.nextId;
        this.name = name;
        this.description = description;
        Item.nextId++;
    }
}