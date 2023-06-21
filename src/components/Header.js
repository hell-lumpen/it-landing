import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import logo from '../static/img/logo.png';
import { Link } from 'react-router-dom';

function Header({ logoLoaded, setLogoLoaded }, ref) {
  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <header ref={ref} className={`${isScrolled ? 'scrolled' : ''} ${logoLoaded ? 'logo-loaded' : ''}`}>
        <nav>
          <div className="logo">
            <img src={logo} alt="IT-центр МАИ логотип" onLoad={handleLogoLoad} />
          </div>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>
          </div>
          <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/bachelors/cs">Компьютерные науки</Link>
            </li>
            <li>
              <Link to="/bachelors/fi">Фундаментальная информатика</Link>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default React.forwardRef(Header);