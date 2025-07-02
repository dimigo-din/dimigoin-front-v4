import React, {useState} from "react";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

type SegmentedTabsProps = {
  tabs: string[];
  defaultIndex?: number;
  onChange?: (index: number, label: string) => void;
};

const Container = styled.div`
    display: flex;
    background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
    border-radius: 16px;
    padding: 6px;
    gap: 4px;

    box-shadow: inset 0 0 0 1px ${({theme}) => theme.Colors.Line.Outline};
`;

const TabButton = styled.button<{ isActive: boolean }>`
    flex: 1;
    padding: 14px 0;
    border: none;
    border-radius: 12px;
    background-color: ${({isActive}) => (isActive ? theme.Colors.Components.Translucent.Secondary : theme.Colors.Solid.White)};
    color: ${({isActive, theme}) =>
  isActive ? theme.Colors.Content.Standard.Primary : theme.Colors.Content.Standard.Secondary};

    font-size: ${({theme}) => theme.Font.Headline.size};
    cursor: pointer;
    transition: all 0.2s ease;
`;

const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
                                                       tabs,
                                                       defaultIndex = 0,
                                                       onChange,
                                                     }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index, tabs[index]);
  };

  return (
    <Container>
      {tabs.map((label, index) => (
        <TabButton
          key={label}
          isActive={selectedIndex === index}
          onClick={() => handleClick(index)}
        >
          {label}
        </TabButton>
      ))}
    </Container>
  );
};

export default SegmentedTabs;
