import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../static/img/logo.png';

function Header() {
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
      <header className={isScrolled ? 'scrolled' : ''}>
        <nav>
          <div className="logo">
            <img src={logo} alt="IT-центр МАИ логотип" />
          </div>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>
            <div className="icon-bar"></div>
          </div>
          <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="/">Главная</a></li>
            <li><a href="/bachelors/cs">Компьютерные науки</a></li>
            <li><a href="/bachelors/fi">Фундаментальная информатика</a></li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;