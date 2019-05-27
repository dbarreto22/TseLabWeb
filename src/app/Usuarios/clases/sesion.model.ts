import {Usuario} from './usuario';
import { Token } from './token';
export class Sesion {
  constructor (
  public token: Token,
  public usr: Usuario,
 ){}


}
