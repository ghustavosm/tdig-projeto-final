import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className="Navbar">
        <Link to="/">Home</Link>
      &nbsp;
        <Link to="/cadastrar">Cadastrar</Link>
      &nbsp;
        <Link to="/sobre">Sobre</Link>
    </div>
);

export default Navbar;