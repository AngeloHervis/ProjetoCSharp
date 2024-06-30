import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Categoria } from "../../../models/Categoria";

function EditarCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [novoNome, setNovoNome] = useState("");

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

  function handleCategoriaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoriaSelecionada(event.target.value);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovoNome(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoriaSelecionada || !novoNome) {
      console.log("Selecione uma categoria e insira um novo nome.");
      return;
    }

    const categoriaAtualizada = {
      categoriaId: categoriaSelecionada,
      nome: novoNome,
    };

    axios
      .put(
        `http://localhost:5272/categoria/editar/${categoriaSelecionada}`,
        categoriaAtualizada
      )
      .then((response) => {
        console.log("Categoria editada com sucesso:", response.data);
        carregarCategorias();
        setCategoriaSelecionada("");
        setNovoNome("");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Edição de Categorias</h1>
      <Link to="/categoria/listarCategoria">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            id="categoria"
            value={categoriaSelecionada}
            onChange={handleCategoriaChange}
          >
            <option value="">Selecione</option>
            {categorias.map((categoria: any) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        {categoriaSelecionada && (
          <div>
            <label htmlFor="novoNome">Novo Nome</label>
            <input
              type="text"
              id="novoNome"
              name="novoNome"
              value={novoNome}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default EditarCategoria;
