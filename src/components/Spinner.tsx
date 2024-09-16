import { Spin } from "antd";
import { ReactNode } from "react";
import { StyledLoadingOutlined } from "../styles/Styled";

interface SpinnerProps {
  children: ReactNode;
  spinning?: boolean;
}

export const Spinner = ({ children, spinning = false }: SpinnerProps) => {
  const antIcon = <StyledLoadingOutlined spin />;

  return (
    <Spin
      indicator={antIcon}
      spinning={spinning}
      style={{ maxHeight: "inherit" }}
    >
      {children}
    </Spin>
  );
};
