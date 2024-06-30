import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SubTarefa } from "../../../models/SubTarefa";

//PUT: http://localhost:5272/tarefa/{tarefaId}/subtarefa/editar/{id}

function EditarSubTarefa() {
  const [subtarefas, setSubtarefas] = useState<SubTarefa[]>([]);
  const [subtarefaSelecionada, setSubtarefaSelecionada] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  useEffect(() => {
    carregarSubTarefas();
  }, []);

  function carregarSubTarefas() {
    axios
      .get("http://localhost:5272/tarefa/subtarefa/listar")
      .then((response) => {
        setSubtarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleSubTarefaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSubtarefaSelecionada(event.target.value);
  }

  function handleDescricaoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovaDescricao(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subtarefaSelecionada || !novaDescricao) {
      console.log("Selecione uma subtarefa e insira uma nova descrição.");
      return;
    }

    const subtarefaAtualizada = {
      subtarefaId: subtarefaSelecionada,
      descricao: novaDescricao,
    };

    axios
      .put(
        `http://localhost:5272/tarefa/subtarefa/editar/${subtarefaSelecionada}`,
        subtarefaAtualizada
      )
      .then((response) => {
        console.log("Subtarefa editada com sucesso:", response.data);
        carregarSubTarefas();
        setSubtarefaSelecionada("");
        setNovaDescricao("");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Edição de Subtarefas</h1>
      <Link to="/tarefa/subtarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Subtarefa</label>
          <select value={subtarefaSelecionada} onChange={handleSubTarefaChange}>
            <option value="">Selecione</option>
            {subtarefas.map((subtarefa) => (
              <option key={subtarefa.subTarefaId} value={subtarefa.subTarefaId}>
                {subtarefa.descricao}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={novaDescricao}
            onChange={handleDescricaoChange}
          />
        </div>
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default EditarSubTarefa;
