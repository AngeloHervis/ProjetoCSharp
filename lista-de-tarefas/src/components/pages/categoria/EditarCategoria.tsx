import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditarCategoria() {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  async function editarCategoria() {
    try {
      const response = await axios.put(
        "https://localhost:5272/api/categorias/alterar/1",
        {
          nome: nome,
          descricao: descricao,
        }
      );
      setMensagem("Categoria editada com sucesso!");
    } catch (error) {
      setMensagem("Erro ao editar categoria!");
    }
  }

  return (
    <div>
      <h1>Editar Categoria</h1>
      <form>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="button" onClick={editarCategoria}>
          Editar
        </button>
      </form>
      <p>{mensagem}</p>
      <Link to="/categorias">Voltar</Link>
    </div>
  );
}

export default EditarCategoria;
