import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExcluirUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

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

    function handleInputChange(event: any) {
        setUsuarioSelecionado(event.target.value);
    }

    function handleFormSubmit(event: any) {
        event.preventDefault();
        if (!usuarioSelecionado) {
            console.log("Selecione um usuário para excluir.");
            return;
        }

        axios
            .delete(`http://localhost:5272/usuario/excluir/${usuarioSelecionado}`)
            .then((response) => {
                console.log("Usuário excluído com sucesso:", response.data);
                carregarUsuarios();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <h1>Exclusão de Usuários</h1>
            <Link to="/usuario/listar">Listar</Link>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="usuario">Usuário</label>
                    <select
                        id="usuario"
                        name="usuario"
                        value={usuarioSelecionado}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione</option>
                        {usuarios.map((usuario: any) => (
                            <option key={usuario.usuarioId} value={usuario.usuarioId}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Excluir</button>
            </form>
        </div>
    );
}

export default ExcluirUsuario;