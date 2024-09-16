export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ImageUploadCropperModalProps {
  title: string;
  reset: string;
  cancel: string;
  upload: string;
  yPosition: string;
  xPosition: string;
  properties: string;
  rotate: string;
  zooming: string;
  setImage: Setter<File | null>;
  imageUrl: string | null;
  setCroppedImageUrl: Setter<string | null>;
  setScaledImageUrl: Setter<string | null>;
  originalImageFile: File | null;
  scaledImageUrl: string | null;
  setImageUrl: Setter<string | null>;
  setModalVisible: Setter<boolean>;
  modalVisible: boolean;
}
