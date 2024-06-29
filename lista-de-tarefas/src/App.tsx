import React from "react";
import "./style/index.css";
import ListarCategoria from "./components/pages/categoria/ListarCategoria";
import CadastrarCategoria from "./components/pages/categoria/CadastrarCategoria";
import EditarCategoria from "./components/pages/categoria/EditarCategoria";
import ExcluirCategoria from "./components/pages/categoria/ExcluirCategoria";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/categoria/ListarCategoria">Listar Categoria</Link>
          </li>
          <li>
            <Link to="/categoria/CadastrarCategoria">Cadastrar Categoria</Link>
          </li>
          <li>
            <Link to="/categoria/EditarCategoria">Editar Categoria</Link>
          </li>
          <li>
            <Link to="/categoria/ExcluirCategoria">Excluir Categoria</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/categoria/ListarCategoria"
          element={<ListarCategoria />}
        />
        <Route
          path="/categoria/CadastrarCategoria"
          element={<CadastrarCategoria />}
        />
        <Route
          path="/categoria/EditarCategoria"
          element={<EditarCategoria />}
        />
        <Route
          path="/categoria/ExcluirCategoria"
          element={<ExcluirCategoria />}
        />
      </Routes>
      <footer>
        <p>
          Desenvolvido pela equipe de desenvolvedores: Adrian, Ângelo e Nicolas
          - 2024
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
