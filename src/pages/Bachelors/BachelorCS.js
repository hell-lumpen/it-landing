// NotFoundPage.js
import React, {useEffect, useRef, useState} from 'react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import '../../App.css'

const BachelorCS = ({ onImageLoad }) => {
  const headerRef = useRef(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const headerElement = headerRef.current; // Используйте headerRef.current для получения header
      const headerHeight = headerElement.offsetHeight;
      setHeaderHeight(headerHeight);
    }, 100);
    return () => clearTimeout(timer);
  }, [logoLoaded]);

  return (
      <div className="App">
        <Header logoLoaded={logoLoaded} setLogoLoaded={setHeaderHeight} ref={headerRef} /> {/* Передача headerRef в Header */}
        <main className="content" style={{ marginTop: `calc(${headerHeight}px + 10px)` }}>
          <section className="content-section"  id="contacts">
            <div className={"content"}>
              <h2>Компьютерные науки и прикладная математика</h2>
              <p>Компьютерные науки и прикладная математика</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  );
};

export default BachelorCS;