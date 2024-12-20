import { FormInstance } from "antd";
import { useEffect } from "react";

interface KeyDownHandlerProps<T extends (...args: unknown[]) => void> {
  isModalOpen: boolean;
  handleSubmit?: T; // Generic type for flexibility
  form?: FormInstance; // Ant Design's Form instance
}

// Custom hook to handle keydown events for Enter and Escape keys
export function useKeyDownHandler<T extends (...args: unknown[]) => void>({
  isModalOpen,
  handleSubmit,
  form,
}: KeyDownHandlerProps<T>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (event.key === "Enter") {
        event.preventDefault();
        if (form) {
          form.submit(); // Trigger the onFinish handler
        } else if (handleSubmit) {
          handleSubmit(); // Fallback if no form
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleSubmit, form]);
}
