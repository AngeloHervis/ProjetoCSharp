import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirCategoria() {
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

  function handleInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoriaSelecionada(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoriaSelecionada) {
      console.log("Selecione uma categoria para excluir.");
      return;
    }

    axios
      .delete(`http://localhost:5272/categoria/excluir/${categoriaSelecionada}`)
      .then((response) => {
        console.log("Categoria excluída com sucesso:", response.data);
        carregarCategorias();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Exclusão de Categorias</h1>
      <Link to="/categoria/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={categoriaSelecionada}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            {categorias.map((categoria: any) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
}

export default ExcluirCategoria;
