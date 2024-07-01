import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";

function EditarTarefa() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

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
  }

  function handleTituloChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovoTitulo(event.target.value);
  }

  function handleDescricaoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovaDescricao(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tarefaSelecionada || !novoTitulo || !novaDescricao) {
      console.log("Selecione uma tarefa e insira um novo título e descrição.");
      return;
    }

    const tarefaAtualizada = {
      tarefaId: tarefaSelecionada,
      titulo: novoTitulo,
      descricao: novaDescricao,
    };

    axios
      .put(
        `http://localhost:5272/tarefa/editar/${tarefaSelecionada}`,
        tarefaAtualizada
      )
      .then((response) => {
        console.log("Tarefa editada com sucesso:", response.data);
        carregarTarefas();
        setTarefaSelecionada("");
        setNovoTitulo("");
        setNovaDescricao("");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Edição de Tarefas</h1>
      <Link to="/tarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Tarefa</label>
          <select onChange={handleTarefaChange}>
            <option value="">Selecione uma tarefa</option>
            {tarefas.map((tarefa) => (
              <option key={tarefa.tarefaId} value={tarefa.tarefaId}>
                {tarefa.titulo}
              </option>
            ))}
          </select>
        </div>
        {tarefaSelecionada && (
          <div>
            <div>
              <label>Título</label>
              <input
                type="text"
                value={novoTitulo}
                onChange={handleTituloChange}
              />
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
          </div>
        )}
      </form>
    </div>
  );
}

export default EditarTarefa;
