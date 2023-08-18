import { Item } from './item.model';

export class Project extends Item {
  private _members: string[];
  private _icon: string;

  constructor(
    name: string,
    members: string[],
    description: string,
    icon: string,
    _id: string
  ) {
    super(name, description, _id);
    this._members = members;
    this._icon = icon;
  }

  get members(): string[] {
    return this._members;
  }

  get icon(): string {
    return this._icon;
  }

  set members(members: string[]) {
    this._members = members;
  }

  set icon(icon: string) {
    this._icon = icon;
  }
}
