import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Link } from "react-router-dom";
import axios from "axios";

function ListarTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

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

  return (
    <div>
      <h1>Listagem de Tarefas</h1>
      <Link to="/tarefa/cadastrar">Cadastrar</Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefa;
