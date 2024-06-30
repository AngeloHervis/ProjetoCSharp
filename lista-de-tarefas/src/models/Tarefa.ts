import { Categoria } from "./Categoria";
import { SubTarefa } from "./SubTarefa";

export interface Tarefa {
  tarefaId: string;
  titulo: string;
  descricao: string;
  criadoEm: string;
  categoriaId?: string;
  categoria?: Categoria;
  status: string;
  usuarioId: string;
  subTarefas?: SubTarefa[];
}
