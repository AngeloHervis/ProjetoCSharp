import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Usuario } from "../../../models/Usuario";

function EditarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

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

  function handleUsuarioChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUsuarioSelecionado(event.target.value);
  }

  function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovoNome(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovoEmail(event.target.value);
  }

  function handleSenhaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNovaSenha(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!usuarioSelecionado || !novoNome || !novoEmail || !novaSenha) {
      console.log("Erro: Todos os campos são obrigatórios.");
      return;
    }

    const usuarioAtualizado = {
      nome: novoNome,
      email: novoEmail,
      senha: novaSenha,
    };

    console.log("Enviando requisição para editar usuário:", usuarioSelecionado);

    axios
      .put(
        `http://localhost:5272/usuario/editar/${usuarioSelecionado}`,
        usuarioAtualizado
      )
      .then((response) => {
        console.log("Usuário editado com sucesso:", response.data);
        carregarUsuarios();
        setUsuarioSelecionado("");
        setNovoNome("");
        setNovoEmail("");
        setNovaSenha("");
      })
      .catch((error) => console.log("Erro ao editar usuário:", error));
  }

  return (
    <div>
      <h1>Edição de Usuarios</h1>
      <Link to={"/usuario/listarUsuario"}>Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <select
            name="usuario"
            id="usuario"
            value={usuarioSelecionado}
            onChange={handleUsuarioChange}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.usuarioId} value={usuario.usuarioId}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        {usuarioSelecionado && (
          <div>
            <div>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                value={novoNome}
                onChange={handleNomeChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={novoEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input
                type="text"
                id="senha"
                value={novaSenha}
                onChange={handleSenhaChange}
              />
            </div>
            <button type="submit">Editar</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditarUsuario;
