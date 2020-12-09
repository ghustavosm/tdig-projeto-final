import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="Navbar">
    <div class="conteudo-navbar">
      <ul class="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cadastrar">Cadastrar</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
      </ul>
    </div>
  </div>
);

export default Navbar;