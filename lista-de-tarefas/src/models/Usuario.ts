import { Tarefa } from "./Tarefa";

export interface Usuario {
  usuarioId: string;
  nome: string;
  email: string;
  senha: string;
  criadoEm: string;
  tarefas?: Tarefa[];
}
