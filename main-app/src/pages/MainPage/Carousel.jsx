import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const images = [
  'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2xEY/image/XwjATX9wymZKOLUUTOf_xtYTWTk.jpg',
  'https://img.freepik.com/free-photo/green-houseplant-background-for-plant-lovers_53876-128849.jpg',
  'https://cdn.imweb.me/upload/S201905295cee7c0f94cee/12d4d58e92dd7.jpeg',
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <CarouselSection>
        <CarouselSlider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <CarouselImage src={image} />
            </div>
          ))}
        </CarouselSlider>
      </CarouselSection>
    </>
  );
};

const CarouselSection = styled.div`
  height: auto;
  padding: 100px 0;
  display: flex;
  align-items: column;
  justify-content: center;
`;

const CarouselTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  font-size: 50px;
`;

const CarouselSlider = styled(Slider)`
  display: flex;
  margin-top: 0px;
  width: 90%;
  border-radius: 30px;
  .slick-slide div {
    outline: none;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 30px;
`;

export default Carousel;
