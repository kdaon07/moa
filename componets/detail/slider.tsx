'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

const imageUrls = [
  '../../test.png',
  '../../test.png',
  '../../test.png',
  '../../test.png',
];

export default function Slider() {
  return (
    <Container>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {imageUrls.map((src, index) => (
          <SwiperSlide key={index}>
            <Img src={src} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  height: calc(100vh - 80px);     
  background-color: aqua;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: lightgray;
`