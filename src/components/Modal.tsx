import { Modal as AntdModal, FormInstance, ModalProps } from "antd";
import { Spinner } from "./Spinner";
import { useKeyDownHandler } from "./ModalKeyDownHandler";

/**
 * Component extends the antd Modal with an added Spinner component
 * which is active when there is a pending API call (gets this from prop).
 */

interface ExtendedModalProps extends ModalProps {
  onOk?: () => void;
  form?: FormInstance;
  apiCallCount?: number; // Add apiCallCount here
}

export const Modal = ({ apiCallCount = 0, ...props }: ExtendedModalProps) => {
  // Use the custom hook for handling Enter key
  useKeyDownHandler({
    isModalOpen: props.open as boolean,
    handleSubmit: props.onOk,
    form: props.form,
  });

  return (
    <AntdModal {...props}>
      <Spinner spinning={apiCallCount !== 0}>{props.children}</Spinner>
    </AntdModal>
  );
};
