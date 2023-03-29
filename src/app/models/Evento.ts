import { Lotes } from './Lotes';
import { Palestrante } from './Palestrante';
import { RedeSocial } from './RedeSocial';

export interface Evento {
  id: number;
  local: string;
  dataEvento: Date;
  tema: string;
  qtdPessoas: string;
  imagemURL: string;
  telefone: string;
  email: string;
  lotes: Lotes[];
  redeSocial: RedeSocial[];
  palestranteEvento: Palestrante[];
}
