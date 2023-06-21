import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../styles/ImageSlider.css'


const ImageSlider = ({ items, sliderOptions }) => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // вызываем функцию для установки изначального значения

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: sliderOptions.dots !== undefined ? sliderOptions.dots : true,
    infinite: sliderOptions.infinite !== undefined ? sliderOptions.infinite : true,
    speed: sliderOptions.speed || 500,
    slidesToScroll: sliderOptions.slidesToScroll || 1,
    autoplay: sliderOptions.autoplay !== undefined ? sliderOptions.autoplay : true,
    autoplaySpeed: sliderOptions.autoplaySpeed || 3000,
    slidesToShow: slidesToShow,
  };


  return (
      <div className="slider-container">
        <div className="slider-wrapper">
          <Slider {...settings}>
            {items.map((item, index) => (
                <div key={index} className="slider-item">
                  <img src={item.image} alt={`Image ${index + 1}`} />
                  {item.title && <h3>{item.title}</h3>}
                  {item.text && <p>{item.text}</p>}
                </div>
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default ImageSlider;