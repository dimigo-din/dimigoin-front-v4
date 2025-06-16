import React, { useState } from "react";
import styled from "styled-components";

type SegmentedTabsProps = {
    tabs: string[];
    defaultIndex?: number;
    onChange?: (index: number, label: string) => void;
};

const Container = styled.div`
    height: 54px;
    display: flex;
    background-color: ${({ theme }) => theme.colors.translucent.primary};
    border-radius: 16px;
    padding: 6px;
    gap: 4px;

    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.primary};
`;

const TabButton = styled.button<{ isActive: boolean }>`
    flex: 1;
    padding: 14px 0;
    border: none;
    border-radius: 12px;
    background-color: ${({ isActive }) => (isActive ? "#fff" : "transparent")};
    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.font.primary : theme.colors.font.secondary};

    font-size: ${({ theme }) => theme.font.base.size};
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
