import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackForm from "../components/FeedbackForm";
import FaqSection from "../components/FaqSection";
import Highlights from "../components/Highlights";
import ImageSlider from "../components/ImageSlider";

function MainPage() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const mainRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const headerRef = useRef(null);

  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const headerElement = headerRef.current; // Используйте headerRef.current для получения header
      const headerHeight = headerElement.offsetHeight;
      setHeaderHeight(headerHeight);
    }, 100);
    return () => clearTimeout(timer);
  }, [logoLoaded]);

  useEffect(() => {
    const mainElement = mainRef.current;
    mainElement.style.marginTop = `${headerHeight}px`;
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

  const faqs = [
    {
      question: 'Какие программы обучения предлагает Институт №8?',
      answer: 'Смысл жизни — это индивидуальный и субъективный вопрос, который каждый человек определяет самостоятельно. Для некоторых смысл жизни заключается в достижении счастья, для других — в поиске знания и истины, а для третьих — в служении другим людям.',
    },
    {
      question: 'Что такое любовь?',
      answer: 'Любовь — это сложное и глубокое чувство привязанности, влечения и заботы о другом человеке. Она может проявляться в разных формах: романтической любви, семейной любви, дружеской любви и т. д. Любовь способна приносить радость, поддержку и счастье, но также может быть источником боли и страдания.',
    },
    {
      question: 'Какой смысл в искусстве?',
      answer: 'Искусство имеет множество смыслов и целей. Оно может быть выражением эмоций, формой самовыражения, средством коммуникации, способом отражения реальности, исследованием формы и цвета, красоты и гармонии. Искусство также может вызывать размышления, вызывать эмоции и вдохновлять людей.',
    },
    {
      question: 'Что такое счастье?',
      answer: 'Счастье — это состояние благополучия, удовлетворенности и радости. Оно может быть разным для разных людей и зависит от их ценностей, жизненных обстоятельств и внутренней гармонии. Счастье может быть связано с достижением целей, удовлетворенными отношениями, благополучием в различных сферах жизни.',
    },
    {
      question: 'Что такое успех?',
      answer: 'Успех — это достижение поставленных целей и удовлетворение своих желаний. Определение успеха также индивидуально и может варьироваться от человека к человеку. Для одного успех может означать финансовое благополучие, для другого — профессиональные достижения, а для третьего — семейное счастье и гармония.',
    },
    {
      question: 'Что такое IT-рабство?',
      answer: 'IT-рабство - это термин, который обычно используется для описания ситуации, когда работники в области информационных технологий (IT) подвергаются эксплуатации, несправедливым условиям труда или ограничениям своих прав. Это может включать чрезмерную нагрузку, длительные рабочие часы, недостаток отдыха и отпусков, низкую оплату, отсутствие возможностей профессионального роста и недостаточную защиту со стороны работодателя.'
    }
  ];

  const highlightsData = [
    { title: 'Уникальные IT-программы 😎', description: 'Кобрендинговые образовательные программы магистратуры с лидерами IT-отрасли: новейшие сквозные технологии, преподаватели-практики, проектная и исследовательская работа, междисциплинарные учебные модули и проекты.' },
    { title: 'Актуальное обучение 🔥', description: 'Тесная связь с индустрией, подготовка специалистов в соответствии с актуальными требованиями работодателей, обучение на реальных задачах.' },
    { title: 'IT-мероприятия 🚀', description: 'Современные технологии обучения, дополнительные образовательные программы и мастер-классы от ведущих специалистов IT и бизнес отрасли, хакатоны, акселерационные программы и поддержка студенческих стартапов.' },
    { title: 'Поддержка 🤝', description: 'Комьюнити выпускников и партнеров: наставничество и менторство, нетворкинг и участие в жизни университета.' },
  ];

  const highlightsBachelor = [
    { title: '01.03.00 Компьютерные науки и прикладная математика', description: 'Откройте двери в захватывающий мир компьютерных наук и прикладной математики, где вы сможете раскрыть свой потенциал в области IT, освоить передовые технологии и создавать инновационные решения, приводящие к прогрессу и изменению мира вокруг вас.', link: '/bachelors/cs' },
    { title: '02.03.02 Фундаментальная информатика и информационные технологии', description: 'Изучайте мир информационных технологий, где ваши IT-компетенции и творческий потенциал объединяются, чтобы создавать инновационные решения и достигать успеха в сфере IT.', link: '/bachelors/fi' }
  ];

  const technologies = [
    {
      category: 'Языки программирования',
      items: ['Python', 'Java', 'C/C++', 'C#'],
    },
    {
      category: 'Фреймворки и библиотеки',
      items: ['Django', 'Flask (Python)', 'Spring (Java)', 'React', "Qt"],
    },
    {
      category: 'Базы данных',
      items: ['PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'Операционные системы',
      items: ['Windows', 'Linux'],
    },
    {
      category: 'Системы контроля версий',
      items: ['Git'],
    },
    {
      category: 'Сетевые протоколы и технологии',
      items: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'сетевая безопасность'],
    },
    {
      category: 'Методологии разработки',
      items: ['Agile', 'Scrum'],
    },
  ];

  const images = [
    'https://i.imgur.com/jGVBT1p.jpeg',
    'https://i.imgur.com/lUXcWyf.jpeg',
    'https://i.imgur.com/9XxPAjG.png',
    'https://i.imgur.com/jGVBT1p.jpeg',
    'https://i.imgur.com/lUXcWyf.jpeg',
    'https://i.imgur.com/9XxPAjG.png'
  ];

  const sliderOptions = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
      <div className="App">
        <Header logoLoaded={logoLoaded} setLogoLoaded={setHeaderHeight} ref={headerRef} /> {/* Передача headerRef в Header */}

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
            <div className={"content"}>
              <p>
                Институт №8 уже свыше полувека готовит умных и талантливых профи, которые успешно штурмуют сферу компьютерных наук и прикладной математики! Не упусти шанс вписать свое имя в нашу историю успеха!
              </p>
              <p>
                Мы - настоящие эксперты в создании и использовании математического и программного обеспечения в самых интересных областях: от вычислительных и информационных систем до систем исусственного интеллекта. И самое крутое: наши выпускники не просто держат в руках дипломы, они успешно применяют свои знания в сфере IT, робототехнике, экономике, авиации, космонавтике и еще куче других востребованных направлений.
              </p>
              <p>
                Мы уверены, что наш опыт и качество образования - это именно то, что поможет тебе сделать крутой взлет в карьере. Что самое главное, в восьмом институте всегда царит атмосфера молодежного вайба и увлекательного обучения. Не упусти свой шанс стать частью нашего сообщества умных и креативных людей!
              </p>
              <p>
                Итак, готов к новым вызовам и бесконечным возможностям? Тогда добро пожаловать в Институт №8 - место, где твои мечты воплощаются в реальность!
              </p>
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <ImageSlider items={images.map(image => ({ image }))} sliderOptions={sliderOptions} />
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <h2>Преимущества обучения</h2>
              <Highlights data={highlightsData}/>
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <h2>Направления института</h2>
              <Highlights data={highlightsBachelor}/>
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <h2>Стек технологий выпускника</h2>
              <div>
                {technologies.map((techCategory, index) => (
                    <div key={index}>
                      <h3>{techCategory.category}</h3>
                      <ul>
                        {techCategory.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <h2>Наши партнеры</h2>
              <p>
                Donec accumsan finibus faucibus. Etiam varius interdum mi, a facilisis sapien faucibus ac. Quisque a metus ex. Pellentesque et condimentum neque, et elementum tellus. Proin egestas augue nec congue posuere. Nam bibendum sodales porta. Vivamus congue, lacus vitae efficitur scelerisque, nibh nunc egestas diam, id lacinia purus sem eu lectus. Donec suscipit, leo id pretium porttitor, urna lorem dapibus ligula, sit amet rhoncus ante turpis eu elit. Morbi rhoncus nunc lorem, at scelerisque turpis luctus eu.
              </p>
            </div>
          </section>

          <section className="content-section">
            <div className={"content"}>
              <h2>Частые вопросы</h2>
              <FaqSection faqs={faqs} />
            </div>
          </section>

          <section className="content-section"  id="contacts">
            <div className={"content"}>
              <h2>Контакты</h2>
              <p>Свяжитесь с нами, чтобы получить дополнительную информацию о нас и наших продуктах. Мы всегда готовы ответить на ваши вопросы и обсудить возможности сотрудничества. Вы можете связаться с нами по телефону, электронной почте или заполнив форму обратной связи на нашем сайте. Мы ждем вашего сообщения!</p>
              {submitError && <div className="error-message">{submitError}</div>}
              <FeedbackForm setSubmitError={setSubmitError} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}

export default MainPage;