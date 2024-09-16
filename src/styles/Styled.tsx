import { ReactNode } from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

export const CropperPropertiesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const CropperContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CropperTitle = styled.label`
  margin-left: 5px;
`;

const CropperSliderContainer = styled.div`
  width: 350px;
  margin-left: 20px;
`;

interface CropperSliderProps {
  children: ReactNode;
  title: string;
}

export const CropperSlider = ({ children, title }: CropperSliderProps) => {
  return (
    <CropperContainer>
      <CropperTitle>{title}</CropperTitle>
      <CropperSliderContainer>{children}</CropperSliderContainer>
    </CropperContainer>
  );
};

export const ImageCropperUpload = styled.img.attrs<{
  $rotation: number;
  $zoom: number;
  x: number;
  y: number;
}>(({ x, y, $rotation, $zoom }) => ({
  style: {
    transform: `translate(${x}px, ${y}px) rotate(${$rotation}deg) scale(${$zoom})`,
  },
}))`
  width: 100%;
  transition: transform 0.03s ease-in-out;
`;

export const ImageUploadPreviewBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 10px;
`;

export const ImageUploadPreviewContainer = styled.div<{
  $previewWidth: number;
  $previewHeight: number;
}>`
  width: ${({ $previewWidth }) => `${$previewWidth}px`};
  height: ${({ $previewHeight }) => `${$previewHeight}px`};
  flex: 0 0 auto;
  position: relative;
`;

export const TextB2 = styled.p`
  color: #334d6e !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  margin-bottom: 10px;
`;

export const SliderModalText = styled(TextB2)`
  text-align: center;
  margin-top: -10px;
`;

const VerticalCropperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalCropperTitle = styled.label`
  margin-bottom: 10px;
  margin-left: 20px;
`;

const VerticalCropperSliderContainer = styled.div`
  height: 300px; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  padding-left: 20px;
`;

interface VerticalSliderCropperProps {
  children: ReactNode;
  title: string;
}

export const VerticalSliderCropper = ({
  children,
  title,
}: VerticalSliderCropperProps) => {
  return (
    <VerticalCropperContainer>
      <VerticalCropperTitle>{title}</VerticalCropperTitle>
      <VerticalCropperSliderContainer>
        {children}
      </VerticalCropperSliderContainer>
    </VerticalCropperContainer>
  );
};

export const StyledLoadingOutlined = styled(LoadingOutlined)`
  font-size: 24px;
  color: #4a6ce3;
`;
