import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CadastrarUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    axios
      .post("http://localhost:5272/usuario/cadastrar", usuario)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Cadastro de Usuários</h1>
      <Link to="/usuario/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarUsuario;