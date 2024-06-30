import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//POST: http://localhost:5272/tarefa/{tarefaId}/subtarefa/cadastrar

function CadastrarSubTarefa() {
  const [subtarefa, setSubtarefa] = useState({
    descricao: "",
  });
  const [tarefaId, setTarefaId] = useState("");

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setSubtarefa({ ...subtarefa, [name]: value });
  }

  function handleFormSubmit(event: any) {
    event.preventDefault();
    axios
      .post(`http://localhost:5272/tarefa/${tarefaId}/subtarefa/cadastrar`, subtarefa)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Cadastro de Subtarefas</h1>
      <Link to="/tarefa/listar">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Tarefa:</label>
          
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={subtarefa.descricao}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarSubTarefa;