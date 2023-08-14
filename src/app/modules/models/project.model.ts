import { Type } from "./enum";
import { Item } from "./item.model";

export class Project extends Item{

    members: string[] ;
    icon: string = '';

    constructor(name: string, members: string[], description: string, icon: string ) {
        super(name, description);
        
        this.members = members;
        this.icon = icon;
    }

    addMember(member: string): void {
        this.members.push(member);
    }

    getMembers(): string[] {
        return this.members;
    }

    removeMember(member: string): void {
        let index = this.members.indexOf(member);
        if (index > -1) {
            this.members.splice(index, 1);
        }
    }

    setIcon(icon: string): void {
        this.icon = icon;
    }

    getIcon(): string {
        return this.icon;
    }

}