import { Submiter } from './submiter';
import { Checker } from './checker';
import { Usuario } from './usuario';
import { Mecanismos } from './mecanismos';

export class Hechos {
    constructor(){
    }
    public id : string;
    public titulo : string;
    public submiter : Submiter;
    public checkers : Array<Checker>;
    public url : string;
    public mailUserAlta : string;
    public usuarioAlta : Usuario;
    public fechaRegistroCalificacion : Date;
    public fechaCalificacion : Date;
    public justificacion : string;
    public validado : boolean;
    public mecanismos = new Array<Mecanismos>();
    public calificacion : string;
    
}
