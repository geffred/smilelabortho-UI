import React, { useState, useEffect } from 'react';
import logo_smilelab from "/image/logo_smilelab_bg.svg"
import smile from "/image/smile.jpg"
import prev from "/image/arrow-prev-white.svg";
import next from "/image/arrow-next-white.svg";
import shop from "/image/shop.svg"
import arrowRigth from "/image/arrow-right.svg";
import './Banner.css';

function Carrousel({ slides }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); //changer les slides toutes les 5 secondes

    return () => clearInterval(interval); //on remet le compteur à 0
  }, []);

  return (
    <div className="banner">

      <div className="left-section">
            <img src={logo_smilelab} alt="logo_smilelab"/>
            <span className='logo-text'>Smile <span className="lab">lab</span> </span>
            <p className='title'>le laboratoire d’orthodontie où l’artisanat rencontre l’innovation.</p>
            <a href="#">
                <img src={shop} alt="shop" width={15} />
                <span>Commander un appareil </span>
                <img className='arrow-right' src={arrowRigth} alt="arrow" width={15} />

            </a>
      </div>

      <div className="banner-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="banner-slide" key={index}>
            <img src={slide.image} alt={slide.alt} />
            <h2>{slide.title}</h2>
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}><img src={prev} alt="preview" /></button>
      <button className="next" onClick={nextSlide}><img src={next} alt="next" /></button>
    </div>
  );
};


function Banner() {

    const slides = [
        { image: smile, alt: 'Image 1', title: 'Orthodontie' },
        { image: smile, alt: 'Image 2', title: 'Impression cda-Cam' },
        { image: smile, alt: 'Image 3', title: 'Stomatologie' },
    ]
      
    return(
        <div className="banner">
            <Carrousel slides={slides} />
        </div>
    )
}

export default Banner;
