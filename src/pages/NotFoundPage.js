// NotFoundPage.js
import React, {useEffect, useRef, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

import '../App.css';

const NotFoundPage = ({ onImageLoad }) => {
  const headerRef = useRef(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      const headerElement = headerRef.current; // Используйте headerRef.current для получения header
      const headerHeight = headerElement.offsetHeight;
      setHeaderHeight(headerHeight);
    }, 100);
    return () => clearTimeout(timer);
  }, [logoLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      setRedirect(true);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
      <div className="App">
        <Header logoLoaded={logoLoaded} setLogoLoaded={setHeaderHeight} ref={headerRef} /> {/* Передача headerRef в Header */}
        <main className="content-wrapper" style={{ marginTop: `calc(${headerHeight}px + 10px)` }}>
          <h2>🙃 404 - Запрашиваемая страница не найдена</h2>
          <p>Страница, которую вы ищете, не существует...</p>
          <div className="loading-indicator">
            <span>Переход на главную через {secondsRemaining} секунд</span>
            <div className="loader"></div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default NotFoundPage;