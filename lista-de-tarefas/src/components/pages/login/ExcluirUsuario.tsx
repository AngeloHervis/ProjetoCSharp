import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirUsuario() {
  const [usuarioId, setUsuarioId] = useState("");

  function handleInputChange(event: any) {
    setUsuarioId(event.target.value);
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    axios
      .delete(`http://localhost:5272/usuario/excluir/${usuarioId}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Exclusão de Usuários</h1>
      <Link to="/usuario/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Id</label>
          <input
            type="text"
            name="usuarioId"
            value={usuarioId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Excluir</button>
      </form>
    </div>
  );
}

export default ExcluirUsuario;