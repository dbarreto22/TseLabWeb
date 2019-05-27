import { Mecanismos } from './mecanismos';
import { Usuario } from './usuario';

export class Perifericos extends Mecanismos{
    constructor(){
        super();
    }
    usuario : Usuario;
    contrasenia : string;
    

}
