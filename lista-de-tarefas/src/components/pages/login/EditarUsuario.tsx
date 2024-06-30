import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Usuario } from "../../../models/Usuario"; // Importe a interface Usuario

function EditarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Tipagem correta
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>("");
  const [novoNome, setNovoNome] = useState<string>("");
  const [novoEmail, setNovoEmail] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");

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
      console.log("Selecione um usuário e insira um novo nome, email e senha.");
      return;
    }

    const usuarioAtualizado = {
      usuarioId: usuarioSelecionado,
      nome: novoNome,
      email: novoEmail,
      senha: novaSenha,
    };

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
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Edição de Usuários</h1>
      <Link to="/usuario/listarUsuario">Listar</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="usuario">Usuário</label>
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
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={novoNome}
              onChange={handleNomeChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={novoEmail}
              onChange={handleEmailChange}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={novaSenha}
              onChange={handleSenhaChange}
            />
          </div>
        )}
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default EditarUsuario;
