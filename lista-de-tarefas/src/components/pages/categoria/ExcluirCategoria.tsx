import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirCategoria() {
  const [id, setId] = useState<number>(0);
  const [mensagem, setMensagem] = useState<string>("");

  async function excluirCategoria() {
    try {
      const response = await axios.delete(
        `https://localhost:5272/api/categorias/excluir/${id}`
      );
      setMensagem("Categoria excluída com sucesso!");
    } catch (error) {
      setMensagem("Erro ao excluir categoria!");
    }
  }

  return (
    <div>
      <h1>Excluir Categoria</h1>
      <form>
        <div>
          <label>Id:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
          />
        </div>
        <button type="button" onClick={excluirCategoria}>
          Excluir
        </button>
      </form>
      <p>{mensagem}</p>
      <Link to="/categorias">Voltar</Link>
    </div>
  );
}

export default ExcluirCategoria;
