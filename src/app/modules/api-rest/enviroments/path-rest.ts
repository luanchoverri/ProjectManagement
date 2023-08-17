import { enviroment } from './enviroment';
export class PathRest{
    static readonly GET_LOGIN = enviroment.hostBackend + '/login';
    static readonly GET_PROJECTS = enviroment.hostBackend + '/projects';
    static readonly GET_EPICS = enviroment.hostBackend + '/epics';
    static readonly GET_STORIES = enviroment.hostBackend + '/stories';
    static readonly GET_USERS = enviroment.hostBackend + '/stories';
    static readonly GET_TASKS = enviroment.hostBackend + '/tasks';
}