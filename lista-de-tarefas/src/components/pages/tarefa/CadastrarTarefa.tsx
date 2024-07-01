import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";

function CadastrarTarefa() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5272/categoria/listar").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const tarefa: Omit<
      Tarefa,
      "tarefaId" | "usuarioId" | "criadoEm" | "status" | "categoria"
    > = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    try {
      await axios.post("http://localhost:5272/tarefa/cadastrar", tarefa);
      alert("Tarefa cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar tarefa: " + error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <Link to="/tarefa">Voltar</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>titulo</label>
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <label>Categoria</label>
          <select
            name="categoriaId"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoriaId} value={categoria.categoriaId}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarTarefa;
