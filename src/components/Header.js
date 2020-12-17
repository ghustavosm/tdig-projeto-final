/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand">Gerenciador de Projetos</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Início</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Alunos
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/listar/alunos">Listar alunos</Link>
              <Link className="dropdown-item" to="/cadastrar/aluno">Cadastrar aluno</Link>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Professores
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/listar/professores">Listar professores</Link>
              <Link className="dropdown-item" to="/cadastrar/professor">Cadastrar professor</Link>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Projetos
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/listar/projetos">Listar projetos</Link>
              <Link className="dropdown-item" to="/cadastrar/projeto">Cadastrar projeto</Link>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/sobre">Sobre</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;