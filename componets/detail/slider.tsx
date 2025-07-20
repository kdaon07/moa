'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SliderProps {
  images: string[];
}

export default function Slider({ images }: SliderProps) {
  return (
    <Wrapper>
      <SliderBox>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <ImageWrapper>
                <Img src={src.startsWith('/') ? `${API_URL}${src}` : src} alt={`Image ${index}`} />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper> 
      </SliderBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 50px 80px;
  gap: 60px;
  transform: translateY(-80px) translateX(-100px);
  margin: 0 auto;
`;

const SliderBox = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const ImageWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px; 
  background-color: #f8f8f8;
`;
