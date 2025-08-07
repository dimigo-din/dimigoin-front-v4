import React, {useEffect, useState} from "react";
import styled from "styled-components";

type SegmentedTabsProps = {
  tabs: string[];
  defaultIndex?: number;
  onChange?: (index: number, label: string) => void;
  fontSize?: "Display" | "Title" | "Headline" | "Body" | "Callout" | "Footnote" | "Caption" | "Paragraph_Large" | "Paragraph_Small";
};

const Container = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.Colors.Background.Primary};
  border-radius: 24px;
  padding: 6px;
  gap: 4px;

  box-shadow: inset 0 0 0 1px ${({theme}) => theme.Colors.Line.Outline};
`;

const TabButton = styled.button<{ isActive: boolean, fontSize: "Display" | "Title" | "Headline" | "Body" | "Callout" | "Footnote" | "Caption" | "Paragraph_Large" | "Paragraph_Small" }>`
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 22px;
  background-color: ${({theme, isActive}) => (isActive ? theme.Colors.Background.Secondary : theme.Colors.Background.Primary)};
  color: ${({isActive, theme}) =>
    isActive ? theme.Colors.Content.Primary : theme.Colors.Content.Secondary};

  font-size: ${({theme, fontSize}) => theme.Font[fontSize].size};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SegmentedTabs: React.FC<SegmentedTabsProps & { force?: number | null, second?: boolean }> = ({ tabs, defaultIndex = 0, onChange, fontSize = "Body", force = null, second = false}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index, tabs[index]);
  };

  useEffect(() => {
    if (force)
      setSelectedIndex(force)
  }, [force]);

  return (
    <Container style={{marginTop: second ? "-16px" : "0px"}}>
      {tabs.map((label, index) => (
        <TabButton
          key={label}
          isActive={selectedIndex === index}
          onClick={() => handleClick(index)}
          fontSize={fontSize}
        >
          {label}
        </TabButton>
      ))}
    </Container>
  );
};

export default SegmentedTabs;
