import { Usuario } from './usuario';

export class Admin extends Usuario{
    constructor(){
        super();
    }
    public contrasenia : string;
}