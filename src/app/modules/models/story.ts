
import { Item } from './item.model';
import { State } from './enum';

// to-do chequear con los demas que la descripcion pueda no estar
// to-do atributo icon

//to-do revisar luego tema tipos para enlazar una epica, o un usuario o arrreglo de usuarios


export class Story extends Item {

    constructor(
        name: string,
        description: string,
        _id: string,
        private _epic: string,   //to-do por ahora referencia al nombre de la epica
        private _owner?: string | undefined,  //to-do reemplazar por user / nombre de usuario / id usuario
        private _assignedTo: string[] = [],
        private _points: number = 0,
        private _created: Date = new Date(),
        private _due?: Date| undefined,
        private _started?: Date| undefined,
        private _finished?: Date | undefined,
        private _status: State = State.Todo
    ) {

        super(name, description, _id);
    }

    // Getters

    public get epic(): string {
        return this._epic
    }

    public get owner(): string | undefined{
        return this._owner ;
    }
    public get assignedTo(): string[] {
        return this._assignedTo ?? [];
    }

    public get points(): number {
        return this._points ?? 0;
    }
    public get created(): Date {
        return this._created;
    }
    public get due(): Date | undefined {
        return this._due;
    }
    public get started(): Date | undefined {
        return this._started ;
    }

    public get finished(): Date | undefined {
        return this._finished ;
    }
    public get status(): State {
        return this._status;
    }

    //Setters

    public set owner(newOwner: string | undefined) {
        this._owner = newOwner;
    }
    public addAssignedTo(newUser: string): void {
        this._assignedTo.push(newUser);
    }

    public set points(newValue: number) {
        if (newValue >= 0 && newValue <= 5) {
            this._points = newValue;
        } else {
            console.log("Points value must be between 0 and 5.");
        }
    }
    public set due(newDate: Date | undefined) {
        this._due = newDate;
    }

    public set started(newDate: Date | undefined) {
        this._started = newDate;
    }

    public set finished(newDate: Date | undefined) {
        this._finished = newDate;
    }

    public set status(newState: State) {
        this._status = newState;
    }




}
