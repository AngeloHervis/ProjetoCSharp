import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SubTarefa } from "../../../models/SubTarefa";
import { Tarefa } from "../../../models/Tarefa";

function CadastrarSubTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tarefaId, setTarefaId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5272/tarefa/listar").then((response) => {
      setTarefas(response.data);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const subtarefa: Omit<
      SubTarefa,
      "subTarefaId" | "tarefaId" | "criadoEm" | "status"
    > = {
      titulo: titulo,
      descricao: descricao,
    };

    try {
      await axios.post(
        `http://localhost:5272/tarefa/${tarefaId}/subtarefa/cadastrar`,
        subtarefa
      );
      alert("Subtarefa cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar subtarefa: " + error);
    }
  };

  return (
    <div>
      <h1>Cadastrar SubTarefa</h1>
      <Link to="/subtarefa">Voltar</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>titulo</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <label>Tarefa</label>
          <select
            name="tarefaId"
            value={tarefaId}
            onChange={(e) => setTarefaId(e.target.value)}
          >
            <option value="">Selecione uma tarefa</option>
            {tarefas.map((tarefa) => (
              <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
                {tarefa.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarSubTarefa;
