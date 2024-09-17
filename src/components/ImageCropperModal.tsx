import { Button, Slider } from "antd";
import { throttle } from "lodash";
import { useEffect, useState } from "react";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../styles/main.css";

import {
  CropperPropertiesContainer,
  CropperSlider,
  ImageCropperUpload,
  ImageUploadPreviewBox,
  ImageUploadPreviewContainer,
  SliderModalText,
  VerticalSliderCropper,
} from "../styles/Styled";
import { Modal } from "./Modal";
import { ImageUploadCropperModalProps } from "../types/types";

const DEFAULT_PREVIEW_WIDTH = 400;
const DEFAULT_PREVIEW_HEIGHT = 400;

export function ImageCropperModal({
  title = "Crop Image",
  reset = "Reset",
  cancel = "Cancel",
  upload = "Upload",
  setImage,
  imageUrl,
  yPosition = "Y",
  xPosition = "X",
  properties = "Properties",
  rotate = "Rotate",
  zooming = "Zoom",
  setCroppedImageUrl,
  setScaledImageUrl,
  originalImageFile,
  scaledImageUrl,
  setImageUrl,
  setModalVisible,
  modalVisible,
}: ImageUploadCropperModalProps) {
  const [crop, setCrop] = useState<PixelCrop>({
    unit: "px",
    width: DEFAULT_PREVIEW_WIDTH,
    height: DEFAULT_PREVIEW_HEIGHT,
    x: 0,
    y: 0,
  });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (imageUrl === null) {
      setCroppedImageUrl(null);
      setScaledImageUrl(null);
      setCrop({
        unit: "px",
        width: DEFAULT_PREVIEW_WIDTH,
        height: DEFAULT_PREVIEW_HEIGHT,
        x: 0,
        y: 0,
      });
      setImage(null);
    }
  }, [imageUrl, setImage]);

  /**
   * Throttles the handler to limit calls to at most once every 300 milliseconds,
   * reducing performance issues while balancing responsiveness.
   */
  const handleZoomChange = throttle((value: number) => {
    setZoom(value);
  }, 300);

  const handleRotationChange = throttle((value: number) => {
    setRotation(value);
  }, 300);

  const handleXPositionChange = throttle((value: number) => {
    setImagePosition((prev) => ({ ...prev, x: value }));
  }, 300);

  const handleYPositionChange = throttle((value: number) => {
    setImagePosition((prev) => ({ ...prev, y: value }));
  }, 300);

  const getCroppedImg = (
    crop: PixelCrop,
    rotation: number,
    imageFile: File
  ): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate the safe area for rotation
          const safeArea = Math.max(image.width, image.height) * 2;
          canvas.width = safeArea;
          canvas.height = safeArea;

          ctx!.fillStyle = "#f5f5f5";
          ctx!.fillRect(0, 0, canvas.width, canvas.height);

          // Center the canvas and rotate the image
          ctx!.translate(safeArea / 2, safeArea / 2);
          ctx!.rotate((rotation * Math.PI) / 180);
          ctx!.translate(-safeArea / 2, -safeArea / 2);

          // Draw the image onto the canvas
          ctx!.drawImage(
            image,
            safeArea / 2 - image.width / 2,
            safeArea / 2 - image.height / 2
          );

          // Calculate the displayed size of the image considering zoom
          const previewWidth = DEFAULT_PREVIEW_WIDTH;
          const previewHeight = DEFAULT_PREVIEW_HEIGHT;
          const imageAspect = image.width / image.height;
          const previewAspect = previewWidth / previewHeight;

          let displayedWidth, displayedHeight;
          if (imageAspect > previewAspect) {
            displayedWidth = previewWidth * zoom;
            displayedHeight = (previewWidth / imageAspect) * zoom;
          } else {
            displayedHeight = previewHeight * zoom;
            displayedWidth = previewHeight * imageAspect * zoom;
          }

          // Calculate scaling factors
          const scaleX = image.width / displayedWidth;
          const scaleY = image.height / displayedHeight;

          // Adjust crop values based on zoom, scaling, and image position
          const effectiveCropX = crop.x - imagePosition.x;
          const effectiveCropY = crop.y - imagePosition.y;

          const scaledCropX =
            (effectiveCropX - (previewWidth - displayedWidth) / 2) * scaleX;
          const scaledCropY =
            (effectiveCropY - (previewHeight - displayedHeight) / 2) * scaleY;

          const scaledCropWidth = crop.width * scaleX;
          const scaledCropHeight = crop.height * scaleY;

          // Get image data for the crop area
          const data = ctx!.getImageData(
            safeArea / 2 - image.width / 2 + scaledCropX,
            safeArea / 2 - image.height / 2 + scaledCropY,
            scaledCropWidth,
            scaledCropHeight
          );

          // Set the canvas dimensions to the crop size
          canvas.width = scaledCropWidth;
          canvas.height = scaledCropHeight;
          ctx!.putImageData(data, 0, 0);

          // Convert the canvas to a Blob and resolve the Promise with a URL
          canvas.toBlob((blob) => {
            if (blob) {
              const croppedUrl = URL.createObjectURL(blob);
              resolve(croppedUrl);
            }
          }, "image/jpeg");
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const getCroppedFile = (
    crop: PixelCrop,
    rotation: number,
    imageFile: File,
    fileName: string
  ): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate the safe area for rotation
          const safeArea = Math.max(image.width, image.height) * 2;
          canvas.width = safeArea;
          canvas.height = safeArea;

          ctx!.fillStyle = "#f5f5f5";
          ctx!.fillRect(0, 0, canvas.width, canvas.height);

          // Center the canvas and rotate the image
          ctx!.translate(safeArea / 2, safeArea / 2);
          ctx!.rotate((rotation * Math.PI) / 180);
          ctx!.translate(-safeArea / 2, -safeArea / 2);

          // Draw the image onto the canvas
          ctx!.drawImage(
            image,
            safeArea / 2 - image.width / 2,
            safeArea / 2 - image.height / 2
          );

          // Calculate the displayed size of the image considering zoom
          const previewWidth = DEFAULT_PREVIEW_WIDTH;
          const previewHeight = DEFAULT_PREVIEW_HEIGHT;
          const imageAspect = image.width / image.height;
          const previewAspect = previewWidth / previewHeight;

          let displayedWidth, displayedHeight;
          if (imageAspect > previewAspect) {
            displayedWidth = previewWidth * zoom;
            displayedHeight = (previewWidth / imageAspect) * zoom;
          } else {
            displayedHeight = previewHeight * zoom;
            displayedWidth = previewHeight * imageAspect * zoom;
          }

          // Calculate scaling factors
          const scaleX = image.width / displayedWidth;
          const scaleY = image.height / displayedHeight;

          // Adjust crop values based on zoom, scaling, and image position
          const effectiveCropX = crop.x - imagePosition.x;
          const effectiveCropY = crop.y - imagePosition.y;

          const scaledCropX =
            (effectiveCropX - (previewWidth - displayedWidth) / 2) * scaleX;
          const scaledCropY =
            (effectiveCropY - (previewHeight - displayedHeight) / 2) * scaleY;

          const scaledCropWidth = crop.width * scaleX;
          const scaledCropHeight = crop.height * scaleY;

          // Get image data for the crop area
          const data = ctx!.getImageData(
            safeArea / 2 - image.width / 2 + scaledCropX,
            safeArea / 2 - image.height / 2 + scaledCropY,
            scaledCropWidth,
            scaledCropHeight
          );

          // Set the canvas dimensions to the crop size
          canvas.width = scaledCropWidth;
          canvas.height = scaledCropHeight;
          ctx!.putImageData(data, 0, 0);

          // Convert the canvas to a Blob and resolve the Promise with a File
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], fileName, { type: "image/jpeg" });
              resolve(file);
            }
          }, "image/jpeg");
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleOk = async () => {
    if (originalImageFile && crop.width && crop.height) {
      if (
        crop.width === DEFAULT_PREVIEW_WIDTH &&
        crop.height === DEFAULT_PREVIEW_HEIGHT &&
        crop.x === 0 &&
        crop.y === 0 &&
        rotation === 0 &&
        zoom === 1
      ) {
        // If the crop size is the same as the preview size and no crop adjustments are made,
        // use the original image file without cropping or scaling.
        setImage(originalImageFile);
        setCroppedImageUrl(imageUrl); // Use the original image URL as the cropped image URL
      } else {
        // Use the cropped version of the image
        const croppedFile = await getCroppedFile(
          crop,
          rotation,
          originalImageFile as File,
          "cropped.jpg"
        );
        const croppedPreview = await getCroppedImg(
          crop,
          rotation,
          originalImageFile as File
        );
        setImage(croppedFile);
        setCroppedImageUrl(croppedPreview);
      }
    }
    resetCrop();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setImage(null);
    setImageUrl(null);
    resetCrop();
    setModalVisible(false);
    setCroppedImageUrl(null);
  };

  const resetCrop = () => {
    if (scaledImageUrl) {
      setCrop({
        unit: "px",
        width: DEFAULT_PREVIEW_WIDTH,
        height: DEFAULT_PREVIEW_HEIGHT,
        x: 0,
        y: 0,
      });
    }
    setRotation(0);
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  return (
    <Modal
      title={title}
      open={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="reset" onClick={resetCrop}>
          {reset}
        </Button>,
        <Button key="back" danger onClick={handleCancel}>
          {cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {upload}
        </Button>,
      ]}
    >
      {scaledImageUrl && (
        <ImageUploadPreviewBox>
          <ImageUploadPreviewContainer
            $previewWidth={DEFAULT_PREVIEW_WIDTH}
            $previewHeight={DEFAULT_PREVIEW_HEIGHT}
          >
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ImageCropperUpload
                $rotation={rotation}
                $zoom={zoom}
                x={imagePosition.x}
                y={imagePosition.y}
                src={scaledImageUrl}
                alt="Crop source"
              />
            </ReactCrop>
          </ImageUploadPreviewContainer>
          <VerticalSliderCropper title={yPosition}>
            <Slider
              vertical
              min={-DEFAULT_PREVIEW_HEIGHT * zoom}
              max={DEFAULT_PREVIEW_HEIGHT * zoom}
              value={imagePosition.y}
              onChange={(value) => handleYPositionChange(value)}
              tooltip={{
                formatter: (value) =>
                  `${yPosition}: ${(
                    (value as number) /
                    DEFAULT_PREVIEW_HEIGHT /
                    zoom
                  ).toFixed(2)}`,
              }}
            />
          </VerticalSliderCropper>
        </ImageUploadPreviewBox>
      )}
      <CropperSlider title={xPosition}>
        <Slider
          min={-DEFAULT_PREVIEW_WIDTH * zoom}
          max={DEFAULT_PREVIEW_WIDTH * zoom}
          value={imagePosition.x}
          onChange={(value) => handleXPositionChange(value)}
          tooltip={{
            formatter: (value) =>
              `${xPosition}: ${(
                (value as number) /
                DEFAULT_PREVIEW_WIDTH /
                zoom
              ).toFixed(2)}`,
          }}
        />
      </CropperSlider>
      <CropperPropertiesContainer>
        <SliderModalText>{properties}</SliderModalText>
        <CropperSlider title={rotate}>
          <Slider
            min={-180}
            max={180}
            step={1}
            value={rotation}
            onChange={(value) => handleRotationChange(value)}
            tooltip={{
              formatter: (value) => `${rotate}: ${value}°`,
            }}
          />
        </CropperSlider>
        <CropperSlider title={zooming}>
          <Slider
            min={1}
            max={10}
            step={0.1}
            value={zoom}
            onChange={(value) => handleZoomChange(value)}
            tooltip={{
              formatter: (value) => `${zooming}: ${value}`,
            }}
          />
        </CropperSlider>
      </CropperPropertiesContainer>
    </Modal>
  );
}
