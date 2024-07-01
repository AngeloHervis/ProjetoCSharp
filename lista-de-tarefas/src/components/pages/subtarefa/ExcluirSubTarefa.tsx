import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirSubTarefa() {
  const [subtarefas, setSubtarefas] = useState([]);
  const [subtarefaSelecionada, setSubtarefaSelecionada] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [tarefaId, setTarefaId] = useState("");

  useEffect(() => {
    carregarSubTarefas();
  }, []);

  function carregarSubTarefas() {
    axios
      .get(`http://localhost:5272/tarefa/${tarefaId}/subtarefa/listar`)
      .then((response) => {
        setSubtarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleSubTarefaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSubtarefaSelecionada(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subtarefaSelecionada) {
      console.log("Selecione uma subtarefa para excluir.");
      return;
    }

    axios
      .delete(
        `http://localhost:5272/tarefa/${tarefaId}/subtarefa/excluir/${subtarefaSelecionada}`
      )
      .then((response) => {
        console.log("Subtarefa excluída com sucesso:", response.data);
        carregarSubTarefas();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Exclusão de Subtarefas</h1>
      <Link to="/tarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="tarefa">Tarefa</label>
          <select
            id="tarefa"
            name="tarefa"
            value={tarefaId}
            onChange={(event) => setTarefaId(event.target.value)}
          >
            <option value="">Selecione</option>
            {tarefas.map((tarefa: any) => (
              <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
                {tarefa.titulo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subtarefa">Subtarefa</label>
          <select
            id="subtarefa"
            name="subtarefa"
            value={subtarefaSelecionada}
            onChange={handleSubTarefaChange}
          >
            <option value="">Selecione</option>
            {subtarefas.map((subtarefa: any) => (
              <option key={subtarefa.subtarefaId} value={subtarefa.subtarefaId}>
                {subtarefa.descricao}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
}

export default ExcluirSubTarefa;
