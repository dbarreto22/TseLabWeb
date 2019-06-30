import { Submiter } from './submiter';
import { Checker } from './checker';
import { Usuario } from './usuario';
import { Mecanismos } from './mecanismos';
import { ResultadosMecanismos } from './resultadosMecanismos';

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
    public resultadosMecanismos : Array<ResultadosMecanismos>;
    public estado : string;
    public img : string;
    public fechaInicioVerificacionStr : string;
    public fechaFinVerificacionStr : string;
    
    clear(){
        this.id='';
        this.titulo='';
        this.submiter=null;
        this.checkers=null;
        this.url='';
        this.mailUserAlta='';
        this.usuarioAlta=null;
        this.justificacion='';
        this.validado=false;
        this.mecanismos = new Array<Mecanismos>();
        this.calificacion='';
        this.resultadosMecanismos =new Array<ResultadosMecanismos>();
        this.estado='';
        this.img='';
        this.fechaFinVerificacionStr='';
        this.fechaInicioVerificacionStr='';
    }
}