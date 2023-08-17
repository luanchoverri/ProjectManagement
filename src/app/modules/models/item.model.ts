import { Type } from "./enum";

export  class Item {

     _id: string;

    name: string;
    description: string;

    constructor(name: string, description: string, _id: string) {
        this.name = name;
        this.description = description;
       this._id = _id;
    

    }


    // abstract get type(): Type

    /**
     * name
     */
    public get nombre():string {
        return this.name;
    }


}