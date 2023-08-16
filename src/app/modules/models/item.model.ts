import { Type } from "./enum";

export  class Item {
    static nextId: number = 0;
    private _id: string;
 

    name: string;
    description: string;

    constructor(name: string, description: string, _id: string) {
        this.name = name;
        this.description = description;
       this.id = Item.nextId;
       Item.nextId++;

    }


    // abstract get type(): Type




}