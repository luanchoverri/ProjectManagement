import { Type } from "./enum";
import { Item } from "./item.model";
import { Project } from "./project.model";

export class Epic extends Item {
 

    private _project: Project;
    private _icon: string ;

    constructor(name: string, description: string, project: Project, icon: string) {
        super(name, description);
        this._project = project;
        this._icon = icon;
    }
    

    get project(): Project {
        return this._project;
    }

    get icon(): string {
        return this._icon;
    }

    set project(project: Project) {
        this._project = project;
    }

    set icon(icon: string) {
        this._icon = icon;
    }
}
