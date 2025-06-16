import styled from "styled-components";

const SectionWrapper = styled.section`
    display: flex;

    flex-direction: column;
    gap: 4px;
`;

const SectionLabel = styled.p`
    font-size: ${({ theme }) => theme.font.base.size};
    color: ${({ theme }) => theme.colors.font.secondary};
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
