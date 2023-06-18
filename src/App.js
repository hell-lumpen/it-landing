import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const mainRef = useRef(null);
  const backgroundImageRef = useRef(null);

  useEffect(() => {
    const headerElement = document.querySelector('header');
    const headerHeight = headerElement.offsetHeight;
    setHeaderHeight(headerHeight);
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;
    mainElement.style.marginTop = `${headerHeight + 10}px`;
  }, [headerHeight]);

  useEffect(() => {
    const backgroundImageElement = backgroundImageRef.current;
    const handleResize = () => {
      const { width } = backgroundImageElement.getBoundingClientRect();
      const height = (width * 628) / 1024;
      backgroundImageElement.style.height = `${height}px`;
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Инициализация высоты при загрузке страницы
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <div className="App">
        <Header />

        <main className="content-wrapper" ref={mainRef}>
          <div className="background-image" ref={backgroundImageRef}>
            <div className="content-overlay">
              <div>
                <h1>Институт №8<br />Компьютерные науки и прикладная математика<br />Учись вместе с профессионалами!</h1>
              </div>
              <div className="button-container">
                <a href="#benefits" className="button">Узнать подробнее</a>
                <a href="#contacts" className="button">Связаться с нами</a>
              </div>
            </div>
          </div>
          <section className="content-section" id="benefits">
            <h2>Преимущества обучения</h2>
            <ul>
              <li>Уникальные IT-программы</li>
              <li>Кобрендинговые образовательные программы магистратуры с лидерами IT-отрасли: новейшие сквозные технологии, преподаватели-практики, проектная и исследовательская работа, междисциплинарные учебные модули и проекты.</li>
              <li>Актуальное обучение</li>
              <li>Тесная связь с индустрией, подготовка специалистов в соответствии с актуальными требованиями работодателей, обучение на реальных задачах.</li>
              <li>IT-мероприятия</li>
              <li>Современные технологии обучения, дополнительные образовательные программы и мастер-классы от ведущих специалистов IT и бизнес отрасли, хакатоны, акселерационные программы и поддержка студенческих стартапов.</li>
              <li>Поддержка</li>
              <li>Комьюнити выпускников и партнеров: наставничество и менторство, нетворкинг и участие в жизни университета.</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Направления института</h2>
            <p>Мы являемся ведущей компанией в своей отрасли и предлагаем инновационные решения для клиентов по всему миру.</p>
          </section>

          <section className="content-section">
            <h2>Стек технологий выпускника</h2>
            <p>Мы являемся ведущей компанией в своей отрасли и предлагаем инновационные решения для клиентов по всему миру.</p>
          </section>

          <section className="content-section">
            <h2>Наши партнеры</h2>
            <p>Мы предлагаем широкий ассортимент продуктов, отвечающих потребностям наших клиентов.</p>
          </section>

          <section className="content-section"  id="contacts">
            <h2>Контакты</h2>
            <p>Свяжитесь с нами, чтобы получить дополнительную информацию о нас и наших продуктах. Мы всегда готовы ответить на ваши вопросы и обсудить возможности сотрудничества. Вы можете связаться с нами по телефону, электронной почте или заполнив форму обратной связи на нашем веб-сайте. Мы ждем вашего сообщения!</p>
          </section>
        </main>

        <Footer />
      </div>
  );
}

export default App;