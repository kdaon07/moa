import styled from "styled-components";

export const Bg = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
`;
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 160px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px 0 0 0;
`;
export const Left = styled.div`
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
export const ImageWrapper = styled.div`
  width: 280px;
  height: 280px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-color: #f8f8f8;
`;
export const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 0;
  max-width: 1000px;
`;
export const MetaText = styled.div`
  font-size: 13px;
  color: #888;
  font-weight: 400;
`;
export const TitleText = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #222;
  white-space: normal;
`;
export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 18px 0 8px 0;
`;
export const FundingBox = styled.div`
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 16px 10px 16px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
export const LabelCell = styled.div`
  width: 80px;
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;
export const InputCell = styled.div`
  flex: 1;
`;
export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 16px;
  background-color: #fff;
  &::placeholder { color: #b0b0b0; }
`;
export const SupporterBox = styled.div`
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 16px 10px 16px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Right = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 5px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
export const FinalBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 5px;
  padding: 16px 20px;
  margin-bottom: 8px;
`;
export const FinalLabel = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
`;
export const FinalAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;
export const Notice = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
  span {
    color: #ff6b6b;
    font-weight: bold;
    font-size: 14px;
  }
`;
export const CheckBoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 4px;
`;
export const GuideDetail = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  line-height: 1.6;
`;
export const DonateButton = styled.button`
  width: 100%;
  margin-top: 18px;
  padding: 16px 0;
  background: #ff6b6b;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff5252;
  }
`; 