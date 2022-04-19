import React from "react";
import { ButtonCustom } from "./style";

export const Button: React.FC<{
  active?: boolean,
  large?: boolean,
  value: string,
  onClick?: () => void,
  type?: "button" | "reset" | "submit",
}> = ({
  active,
  large,
  value,
  onClick,
  type
}) => {
  return (
    <ButtonCustom
      active={active || false}
      large={large || false}
      onClick={onClick}
      type={type}
    >{value}</ButtonCustom>
  );
};