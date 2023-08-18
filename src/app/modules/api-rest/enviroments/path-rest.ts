import { endpoint } from './endpoints';
import { enviroment } from './enviroment';
import { Epic } from '../../models/epic.model';

export class PathRest{
    static readonly GET_LOGIN = enviroment.hostBackend + endpoint.LOGIN;
    static readonly GET_PROJECTS = enviroment.hostBackend + endpoint.PROJECTS;
    static readonly GET_EPICS = enviroment.hostBackend + endpoint.EPICS;
    static readonly GET_STORIES = enviroment.hostBackend + endpoint.STORIES;
    static readonly GET_USERS = enviroment.hostBackend + endpoint.USERS;
    static readonly GET_TASKS = enviroment.hostBackend + endpoint.TASKS;
}

