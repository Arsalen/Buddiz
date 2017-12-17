import { Carte } from './carte'

export class Sortie {
    id: number;
    nom: string;
    description: string;
    date: String;
    lieu: string;
    cartes: Array<Carte>;
    favoris: Array<Carte>
  }
