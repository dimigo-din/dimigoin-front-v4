import React from "react";
import { ItemBox, IconBox } from "./style";

export interface NavigationItem {
  title?: string;
  Accent?: string;
  Disable?: string;
  selected?: boolean;
  route: string;
  division?: boolean;
};

const NavigationItem: React.FC<
  NavigationItem
> = ({ title, Accent, Disable, selected = false, route }) => (
  <ItemBox to={route} selected={selected}>
    <IconBox src={selected ? Accent : Disable} />
    {title}
  </ItemBox>
);

export default NavigationItem;