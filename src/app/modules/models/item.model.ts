import { Type } from "./enum";

export abstract class Item {
    static nextId: number = 0;
    id: number;
    // to-do agregar icon?

    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
       this.id = Item.nextId;
       Item.nextId++;

    }


    abstract get type(): Type




}