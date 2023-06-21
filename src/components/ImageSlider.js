import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ImageSlider = ({ items, sliderOptions }) => {
  const settings = {
    dots: sliderOptions.dots !== undefined ? sliderOptions.dots : true,
    infinite: sliderOptions.infinite !== undefined ? sliderOptions.infinite : true,
    speed: sliderOptions.speed || 500,
    slidesToShow: sliderOptions.slidesToShow || 1,
    slidesToScroll: sliderOptions.slidesToScroll || 1,
    autoplay: sliderOptions.autoplay !== undefined ? sliderOptions.autoplay : true,
    autoplaySpeed: sliderOptions.autoplaySpeed || 3000,
  };

  return (
      <Slider {...settings}>
        {items.map((item, index) => (
            <div key={index}>
              <img src={item.image}  alt={item.image} width={310} height={'auto'}/>
              {item.title && <h3>{item.title}</h3>}
              {item.text && <p>{item.text}</p>}
            </div>
        ))}
      </Slider>
  );
};

export default ImageSlider;