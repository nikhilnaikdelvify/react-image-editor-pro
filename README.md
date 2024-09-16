# `react-image-editor-pro`

`react-image-editor-pro` is a React component designed for uploading, cropping, and editing images with a user-friendly interface. It leverages Ant Design for the modal interface and includes a modal for image cropping with various options.

## Features

- Crop and edit images in a modal.
- Preview cropped images before finalizing.
- Supports scaling and rotation of images.

## Installation

To install `react-image-editor-pro`, use npm or yarn:

```sh
npm install react-image-editor-pro

or

yarn add react-image-editor-pro
```

## Usage Example

The user clicks on the upload area, which triggers the Upload component.
The customRequest function handles the file selection, updates state variables, and opens the cropping modal.
Crop and Edit Image:

The cropping modal (ImageCropperModal) allows users to crop, zoom, and rotate the image.
The final cropped image is displayed as a preview and can be set using the provided setter functions.
Styling
The component uses custom styling through styled components. Ensure you include the required CSS files and apply any additional styles as needed.

## ImageUploadCropperModalProps

Here’s a table of the props used in the `ImageUploadCropperModal` component:

| **Prop**             | **Type**          | **Description**                                          |
| -------------------- | ----------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| `title`              | `string`          | The title of the modal.                                  |
| `reset`              | `string`          | The text for the reset button.                           |
| `cancel`             | `string`          | The text for the cancel button.                          |
| `upload`             | `string`          | The text for the upload button.                          |
| `yPosition`          | `string`          | The label for the Y position control.                    |
| `xPosition`          | `string`          | The label for the X position control.                    |
| `properties`         | `string`          | The label for the properties control.                    |
| `rotate`             | `string`          | The label for the rotate control.                        |
| `zooming`            | `string`          | The label for the zoom control.                          |
| `setImage`           | `Setter<File      | null>`                                                   | A setter function to handle the uploaded image file.                   |
| `imageUrl`           | `string           | null`                                                    | The URL of the image to display in the modal (if available).           |
| `setCroppedImageUrl` | `Setter<string    | null>`                                                   | A setter function to handle the URL of the cropped image.              |
| `setScaledImageUrl`  | `Setter<string    | null>`                                                   | A setter function to handle the URL of the scaled image.               |
| `originalImageFile`  | `File             | null`                                                    | The original image file being edited.                                  |
| `scaledImageUrl`     | `string           | null`                                                    | The URL of the scaled image (if available).                            |
| `setImageUrl`        | `Setter<string    | null>`                                                   | A setter function to handle the URL of the image for display purposes. |
| `setModalVisible`    | `Setter<boolean>` | A setter function to handle the visibility of the modal. |
| `modalVisible`       | `boolean`         | The visibility state of the modal.                       |

## Additional Notes

Ensure you have antd and react-image-crop installed as peer dependencies.
The ImageCropperModal component handles the cropping logic and should be customized to fit your needs.

## License

```
This `README.md` includes the usage example code and parameters table properly formatted within code blocks for easy copying and pasting.

```
