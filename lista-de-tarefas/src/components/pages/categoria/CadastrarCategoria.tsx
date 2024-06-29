import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CadastrarCategoria() {
  const [categoria, setCategoria] = useState({
    id: "",
    nome: "",
  });


function handleInputChange(event: any) {
  const { name, value } = event.target;
  setCategoria({ ...categoria, [name]: value });
}

function handleFormSubmit(event: any) {
  event.preventDefault();
  axios
    .post("https://localhost:5272/api/categorias/cadastrar", categoria)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

return (
  <div>
    <h1>Cadastrar Categoria</h1>
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={categoria.nome}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <Link to="/categorias">Voltar</Link>
  </div>
);
}

export default CadastrarCategoria;
