import styled from "styled-components";

const SectionWrapper = styled.section`
    display: flex;

    flex-direction: column;
    gap: 4px;
`;

const SectionLabel = styled.p`
    font-size: ${({ theme }) => theme.Font.Paragraph_Large.size};
    color: ${({ theme }) => theme.Colors.Content.Standard.Secondary};
    margin-bottom: 8px;
`;

function Section({
    children,
    label,
}: {
    children: React.ReactNode;
    label: string;
}) {
    return (
        <SectionWrapper>
            <SectionLabel>{label}</SectionLabel>
            {children}
        </SectionWrapper>
    );
}

export default Section;
