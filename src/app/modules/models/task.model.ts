import { Item } from "./item.model";
import { Story } from "./story";

export class Task extends Item {

    private _story: Story;
    private _created?: Date;
    private _dueDate?: Date;
    private _done?: boolean;

    constructor(name: string, description: string, _id :string, story: Story, created?: Date, dueDate?: Date, done?: boolean) {
        super(name, description, _id);
        this._story = story;
        this._created = created || new Date();
        this._dueDate = dueDate;
        this._done = done || false;
    }

    // Getters
    get story(): Story {
        return this._story;
    }

    get created(): Date | undefined {
        return this._created;
    }

    get due(): Date | undefined {
        return this._dueDate;
    }

    get done(): boolean | undefined {
        return this._done;
    }

    // Setters
    set story(value: Story) {
        this._story = value;
    }

    set created(value: Date | undefined) {
        this._created = value;
    }

    set dueDate(value: Date | undefined) {
        this._dueDate = value;
    }

    set done(value: boolean | undefined ) {
        this._done = value;
    }

}