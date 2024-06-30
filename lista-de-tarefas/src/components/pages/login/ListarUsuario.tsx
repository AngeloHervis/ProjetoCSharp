import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Usuario } from "../../../models/Usuario";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    axios
      .get("http://localhost:5272/usuario/listar")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Listagem de Usuários</h1>
      <Link to="/usuario/cadastrarUsuario">Página de cadastro de usuários</Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.usuarioId}>
              <td>{usuario.usuarioId}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarUsuario;
