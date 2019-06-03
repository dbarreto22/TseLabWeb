import { Mecanismos } from './mecanismos';
import { Usuario } from './usuario';

export class Perifericos extends Mecanismos {
    constructor(){
       super()
    }

    public usuario : Usuario;
    public password : string;
    public mecanismo : string;
    

}
