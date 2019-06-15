

import { Observable } from 'rxjs';
import { Hechos } from './hechos';

export class listadoHechos{
    constructor(){
    }
    public listado = new Array<Hechos>();
    public cantElementos : string;
}