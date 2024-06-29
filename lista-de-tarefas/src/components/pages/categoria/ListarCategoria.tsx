import { useEffect, useState } from "react";
import { Categoria } from "../../../models/Categoria";
import { Link } from "react-router-dom";
import axios from "axios";

function ListarCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        axios
            .get("https://localhost:5272/api/categorias/listar")
            .then((response) => {
            setCategorias(response.data);
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);

  return (
    <div>
      <h1>Listar Categoria</h1>
      <Link to="/categoria/CadastrarCategoria">Cadastrar Categoria</Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nome}</td>
              <td>{categoria.criadoEm}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/categorias">Voltar</Link>
    </div>
  )
}

export default ListarCategoria;
