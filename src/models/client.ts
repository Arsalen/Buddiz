import {Sortie} from './sortie'

export class Client {
  id: number;
  nom: string;
  mail: string;
  passe: string;
  image: string;
  sorties: Array<Sortie>;
}