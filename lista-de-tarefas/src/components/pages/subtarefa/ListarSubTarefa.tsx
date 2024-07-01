import { useEffect, useState } from "react";
import { SubTarefa } from "../../../models/SubTarefa";
import { Link } from "react-router-dom";
import axios from "axios";

function ListarSubTarefa() {
  const [subTarefas, setSubTarefas] = useState<SubTarefa[]>([]);
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

  function handleTarefaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTarefaSelecionada(event.target.value);
    axios
      .get(
        `http://localhost:5272/tarefa/${event.target.value}/subtarefa/listar`
      )
      .then((response) => {
        setSubTarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Listagem de Subtarefas</h1>
      <Link to="/subtarefa/cadastrarSubTarefa">
        Página de cadastro de subtarefas
      </Link>
      <br />
      <label htmlFor="tarefa">Tarefa</label>
      <select
        id="tarefa"
        name="tarefa"
        value={tarefaSelecionada}
        onChange={handleTarefaChange}
      >
        <option value="">Selecione</option>
        {tarefas.map((tarefa: any) => (
          <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
            {tarefa.titulo}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {subTarefas.map((subTarefa) => (
            <tr key={subTarefa.subTarefaId}>
              <td>{subTarefa.subTarefaId}</td>
              <td>{subTarefa.titulo}</td>
              <td>{subTarefa.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarSubTarefa;
