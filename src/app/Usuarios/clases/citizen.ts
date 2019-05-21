import { Usuario } from './usuario';

export class Citizen extends Usuario{
    constructor(){
        super();
    }
    public contrasenia : string;
}