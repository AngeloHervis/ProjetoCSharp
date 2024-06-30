import { useEffect, useState } from "react";
import { SubTarefa } from "../../../models/SubTarefa";
import { Link } from "react-router-dom";
import axios from "axios";

//GET: http://localhost:5272/tarefa/{tarefaId}/subtarefa/listar

function ListarSubTarefa() {
  const [subtarefas, setSubTarefas] = useState<SubTarefa[]>([]);
  const [tarefaId, setTarefaId] = useState("");

  useEffect(() => {
    carregarSubTarefas();
  }, []);

  function carregarSubTarefas() {
    axios
      .get(`http://localhost:5272/tarefa/${tarefaId}/subtarefa/listar`)
      .then((response) => {
        setSubTarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Listagem de Subtarefas</h1>
      <Link to="/tarefa/listar">Voltar</Link>
      <form>
        <div>
          <label>Tarefa Id</label>
          <input
            type="text"
            value={tarefaId}
            onChange={(event) => setTarefaId(event.target.value)}
          />
        </div>
        <button type="button" onClick={carregarSubTarefas}>
          Buscar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {subtarefas.map((subtarefa) => (
            <tr key={subtarefa.subTarefaId}>
              <td>{subtarefa.subTarefaId}</td>
              <td>{subtarefa.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarSubTarefa;