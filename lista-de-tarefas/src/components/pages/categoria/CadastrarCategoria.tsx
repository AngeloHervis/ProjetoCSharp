import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CadastrarCategoria() {
  const [categoria, setCategoria] = useState({
    nome: "",
  });

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setCategoria({ ...categoria, [name]: value });
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    axios
      .post("http://localhost:5272/categoria/cadastrar", categoria)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Cadastro de Categorias</h1>
      <Link to="/categoria/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={categoria.nome}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarCategoria;
