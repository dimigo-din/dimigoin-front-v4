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
        padding: 0 4px;
        font-size: ${({ theme }) => theme.font.xl.size};
        color: ${({ theme }) => theme.colors.brand.primary};
        font-weight: ${({ theme }) => theme.font.xl.weight};
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

            <Button>잔류 신청</Button>
        </>
    );
}

export default StaySection;
