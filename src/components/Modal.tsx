import { Modal as AntdModal, ModalProps } from "antd";
import { Spinner } from "./Spinner";

interface CustomModalProps extends ModalProps {
  apiCallCount?: number; // Optional apiCallCount prop
}

/**
 * Component extends the antd Modal with an added Spinner component
 * which is active when there is a pending API call (gets this from prop).
 */
export const Modal = ({ apiCallCount = 0, ...props }: CustomModalProps) => {
  return (
    <AntdModal {...props}>
      <Spinner spinning={apiCallCount !== 0}>{props.children}</Spinner>
    </AntdModal>
  );
};
