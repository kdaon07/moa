'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../../componets/header';
import Button from '../../componets/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SwiperNavStyle = createGlobalStyle`
  .swiper-button-next, .swiper-button-prev {
    top: 50%;
    width: 44px;
    height: 44px;
    margin-top: -22px;
    color: #ff6b6b;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    z-index: 10;
  }
  .swiper-button-prev {
    left: -56px;
  }
  .swiper-button-next {
    right: -56px;
  }
`;

export default function MakePage() {
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/';
    }
  }, []);

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [goal, setGoal] = useState('');
  const [account, setAccount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + images.length > 9) {
        alert('이미지는 최대 9개까지 등록할 수 있습니다.');
        return;
      }
      const newImages = images.concat(files).slice(0, 9);
      setImages(newImages);
      const previewUrls = newImages.map(file => URL.createObjectURL(file));
      setPreviews(previewUrls);
      // 디버깅용 로그
      console.log('선택된 파일:', newImages);
      console.log('미리보기 URL:', previewUrls);
    }
  };

  const handleRemoveImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    const newPreviews = previews.filter((_, i) => i !== idx);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. 이미지 업로드 (각 파일마다 /api/images)
      const token = localStorage.getItem('token');
      const imageIdList: number[] = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${API_URL}/api/images`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('이미지 업로드 실패');
        const result = await res.text(); // "id:/uploads/파일명"
        const id = parseInt(result.split(':')[0], 10);
        imageIdList.push(id);
      }
      // 2. 프로젝트 생성
      const projectRes = await fetch(`${API_URL}/api/project/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          description: desc,
          targetAmount: Number(goal),
          accountNumber: account,
          deadline,
          imageIds: imageIdList,
        }),
      });
      if (!projectRes.ok) throw new Error('프로젝트 생성 실패');
      alert('프로젝트가 성공적으로 생성되었습니다!');
      window.location.href = '/';
    } catch (err: any) {
      alert('생성 중 오류: ' + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SwiperNavStyle />
      <Header />
      <MainContainer>
        <LeftBox>
          <ImageUploadBox htmlFor="image-upload">
            {previews.length === 0 ? (
              <EmptyBox>
                <Icon>📁</Icon>
                <span>클릭해서 썸네일 등록하기</span>
              </EmptyBox>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                style={{ width: '100%', height: '100%' }}
              >
                {previews.map((src, idx) => (
                  <SwiperSlide key={idx} style={{ width: '100%', height: '100%' }}>
                    <PreviewImgWrapper>
                      <OrderBox>{idx + 1}</OrderBox>
                      <RemoveBtn type="button" onClick={e => { e.stopPropagation(); handleRemoveImage(idx); }}>×</RemoveBtn>
                      <PreviewImg src={src} alt={`preview-${idx}`} />
                    </PreviewImgWrapper>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </ImageUploadBox>
        </LeftBox>
        <RightBox as="form" onSubmit={handleSubmit}>
          <Label>
            <span>폼 제목<Required>*</Required></span>
            <Input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </Label>
          <Label>
            <span>상세 설명<Required>*</Required></span>
            <TextArea
              placeholder="내용을 입력해주세요"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              required
            />
          </Label>
          <Label>
            <span>목표 금액<Required>*</Required></span>
            <Input
              type="number"
              placeholder="목표 금액을 입력해주세요"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              required
            />
          </Label>
          <Label>
            <span>계좌번호<Required>*</Required></span>
            <Input
              type="text"
              placeholder="계좌번호를 입력해주세요"
              value={account}
              onChange={e => setAccount(e.target.value)}
              required
            />
          </Label>
          <Label>
            <span>마감일<Required>*</Required></span>
            <Input
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              required
              style={{ width: '180px' }}
            />
          </Label>
          <SubmitBtnBox>
            <SubmitBtn type="submit" disabled={loading}>{loading ? '생성 중...' : '폼 만들기'}</SubmitBtn>
          </SubmitBtnBox>
        </RightBox>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  max-width: 1200px;
  min-height: 80vh;
  padding: 60px 0 60px 0;
  margin: 0 auto;
`;

const LeftBox = styled.div`
  flex: 1;
  min-width: 350px;
  max-width: 440px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ImageUploadBox = styled.label`
  width: 350px;
  height: 350px;
  background: #f7f7f7;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 12px;
  overflow-x: auto;
`;

const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b0b0b0;
  font-size: 16px;
`;

const Icon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const PreviewImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderBox = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff;
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  padding: 4px 12px;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: #ff6b6b;
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background: #eee;
`;

const RightBox = styled.div`
  flex: 1.2;
  min-width: 320px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-left: 40px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 600;
  gap: 7px;

  & > span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 17px;
    font-weight: 600;
  }
`;

const Required = styled.span`
  color: #ff6b6b;
  font-size: 18px;
  margin-left: 2px;
`;

const Input = styled.input`
  height: 44px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 16px;
  background: white;
  margin-top: 4px;
  &::placeholder {
    color: #b0b0b0;
  }
`;

const TextArea = styled.textarea`
  min-height: 90px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 16px;
  background: white;
  resize: vertical;
  margin-top: 4px;
  &::placeholder {
    color: #b0b0b0;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const SubmitBtnBox = styled.div`
  margin-top: 18px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ff5252;
  }
`;
