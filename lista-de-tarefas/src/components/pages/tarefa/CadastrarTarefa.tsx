import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CadastrarTarefa() {
  const [tarefa, setTarefa] = useState({
    titulo: "",
    descricao: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    axios
      .get("http://localhost:5272/categoria/listar")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => console.log(error));
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    if (name === "categoria") {
      setCategoriaSelecionada(value);
    } else {
      setTarefa({ ...tarefa, [name]: value });
    }
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(`http://localhost:5272/usuario/{usuarioId}/tarefa/cadastrar`, {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        categoriaId: categoriaSelecionada,
      })
      .then((response) => {
        console.log("Tarefa cadastrada com sucesso:", response.data);
        // Limpar o formulário ou redirecionar para outra página, se necessário
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Cadastro de Tarefas</h1>
      <Link to="/tarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={tarefa.descricao}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoria</label>
          <select
            name="categoria"
            value={categoriaSelecionada}
            onChange={handleInputChange}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria: any) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarTarefa;
