import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SubTarefa } from "../../../models/SubTarefa";
import { Tarefa } from "../../../models/Tarefa";

function EditarSubTarefa() {
  const [subTarefas, setSubTarefas] = useState<SubTarefa[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState("");
  const [subTarefaSelecionada, setSubTarefaSelecionada] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  useEffect(() => {
    carregarTarefas();
    carregarSubTarefas();
  }, []);

  function carregarTarefas() {
    axios
      .get("http://localhost:5272/tarefa/listar")
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  function carregarSubTarefas() {
    axios
      .get("http://localhost:5272/tarefa/{tarefaId}/subtarefa/listar")
      .then((response) => {
        setSubTarefas(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleTarefaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTarefaSelecionada(event.target.value);
  }

  function handleSubTarefaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSubTarefaSelecionada(event.target.value);
  }

  function handleTituloChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovoTitulo(event.target.value);
  }

  function handleDescricaoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovaDescricao(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subTarefaSelecionada || !novoTitulo || !novaDescricao) {
      console.log(
        "Selecione uma subtarefa e insira um novo título e descrição."
      );
      return;
    }

    const subTarefaAtualizada = {
      subTarefaId: subTarefaSelecionada,
      tarefaId: tarefaSelecionada,
      titulo: novoTitulo,
      descricao: novaDescricao,
    };

    axios
      .put(
        `http://localhost:5272/tarefa/${tarefaSelecionada}/subtarefa/editar/${subTarefaSelecionada}`,
        subTarefaAtualizada
      )
      .then((response) => {
        console.log("SubTarefa editada com sucesso:", response.data);
        carregarSubTarefas();
        setTarefaSelecionada("");
        setSubTarefaSelecionada("");
        setNovoTitulo("");
        setNovaDescricao("");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Edição de SubTarefas</h1>
      <Link to="/subtarefa/listar">Listar</Link>
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
              <label>SubTarefa</label>
              <select onChange={handleSubTarefaChange}>
                <option value="">Selecione uma subtarefa</option>
                {subTarefas
                  .filter(
                    (subTarefa) => subTarefa.tarefaId === tarefaSelecionada
                  )
                  .map((subTarefa) => (
                    <option
                      key={subTarefa.subTarefaId}
                      value={subTarefa.subTarefaId}
                    >
                      {subTarefa.titulo}
                    </option>
                  ))}
              </select>
            </div>
            {subTarefaSelecionada && (
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
          </div>
        )}
      </form>
    </div>
  );
}

export default EditarSubTarefa;
