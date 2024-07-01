import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState("");

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    axios
      .get("http://localhost:5272/tarefa/listar")
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTarefaSelecionada(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tarefaSelecionada) {
      console.log("Selecione uma tarefa para excluir.");
      return;
    }

    axios
      .delete(`http://localhost:5272/tarefa/excluir/${tarefaSelecionada}`)
      .then((response) => {
        console.log("Tarefa excluída com sucesso:", response.data);
        carregarTarefas();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Exclusão de Tarefas</h1>
      <Link to="/tarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="tarefa">Tarefa</label>
          <select
            id="tarefa"
            name="tarefa"
            value={tarefaSelecionada}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            {tarefas.map((tarefa: any) => (
              <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
                {tarefa.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
}

export default ExcluirTarefa;
