import styled from "styled-components";
import Section from "../../../components/Section";
import { Button } from "../../../styles/components/button";
import { Input } from "../../../styles/components/input";

const SeatSelect = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    align-items: center;
    p {
        font-size: ${({ theme }) => theme.font.xl.size};
        color: ${({ theme }) => theme.colors.brand.primary};
        font-weight: ${({ theme }) => theme.font.xl.weight};
    }
`;

const StayStatus = styled.p`
    font-size: ${({ theme }) => theme.font.lg.size};
    color: ${({ theme }) => theme.colors.font.secondary};

    span {
        color: ${({ theme }) => theme.colors.brand.primary};
        font-weight: ${({ theme }) => theme.font.baseBold.weight};
        border-bottom: 2px solid ${({ theme }) => theme.colors.brand.primary};
        cursor: pointer;
        transition: color 0.3s ease, border-color 0.3s ease;
        &:hover {
            color: ${({ theme }) => theme.colors.button.primaryHover};
            border-color: ${({ theme }) => theme.colors.button.primaryHover};
        }
    }
`;

function StaySection() {
    return (
        <>
            <Section label="내가 선택한 좌석">
                <SeatSelect>
                    <p>미선택</p>
                    <Button width="120px">좌석 선택</Button>
                </SeatSelect>
            </Section>
            <Section label="좌석 미선택 사유">
                <Input placeholder="좌석 미선택 사유 입력" />
            </Section>
            <Section label="잔류 현황">
                <StayStatus>
                    <span>여기</span>에서 잔류 신청 현황을 확인하세요
                </StayStatus>
            </Section>

            <Button>잔류 신청</Button>
        </>
    );
}

export default StaySection;
