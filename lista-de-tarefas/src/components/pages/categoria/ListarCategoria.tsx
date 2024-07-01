import { useEffect, useState } from "react";
import { Categoria } from "../../../models/Categoria";
import { Link } from "react-router-dom";
import axios from "axios";

function ListarCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

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

  return (
    <div>
      <h1>Listagem de Categorias</h1>
      <Link to="/categoria/cadastrarCategoria">
        Página de cadastro de categorias
      </Link>
      <br />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.categoriaId}>
              <td>{categoria.categoriaId}</td>
              <td>{categoria.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarCategoria;
