// stylesheet import
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <p className="logo">Dona</p>

      <p className="time">12:30PM</p>

      <nav className="nav">
        <a href="/" className="nav-link active">
          Home
        </a>
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#portfolio" className="nav-link">
          Portfolio
        </a>
        <a href="#comp-card" className="nav-link">
          Comp Card
        </a>
        <a href="#contact" className=" nav-link contact">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
