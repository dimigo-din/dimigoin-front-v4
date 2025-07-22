import styled from "styled-components";
import Section from "../../../components/Section";
import {Button} from "../../../styles/components/button";
import {Input} from "../../../styles/components/input";
import {useEffect, useState} from "react";
import {getStays, type Stay} from "../../../api/stay.ts";
import SelectionDialog from "../../../components/SelectionDialog.tsx";
import Loading from "../../../components/Loading.tsx";

import ArrowDown from "../../../assets/icons/arrow_down.svg?react";
import {genTable} from "../../../utils/staySeatUtil.ts";

const StayKind = styled.div`
  font-size: ${(props) => props.theme.Font.Body.size};
  color: ${(props) => props.theme.Colors.Content.Standard.Secondary};
  
  > span {
    color: ${({theme}) => theme.Colors.Core.Brand.Primary};
  }
`;

const NoStay = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  font-size: ${(props) => props.theme.Font.Headline.size};
`;

const Divider = styled.div`
  height: 4px;
  width: calc(100% - 16px);
  margin: 8px;
  
  border-radius: 2px;
  
  background-color: ${(props) => props.theme.Colors.Line.Divider};
`;

const SeatSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  p {
    margin: auto 0;
    
    align-items: center;
    font-size: ${({theme}) => theme.Font.Title.size};
    color: ${({theme}) => theme.Colors.Core.Brand.Primary};
    font-weight: ${({theme}) => theme.Font.Title.weight.strong};
  }
`;

const SeatBox = styled.div`
  height: 60vh;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  
  overflow: scroll;
`;

const SeatRow = styled.div<{seat: string}>`
  width: fit-content;
  
  white-space: nowrap;
  
  > span {
    display: inline-block;
    
    width: 7vh;
    
    padding: 12px 18px;
    margin: 8px;
    
    background-color: ${(props) => props.theme.Colors.Background.Standard.Secondary};
    border-radius: 8px;
    
    text-align: center;
  }
  
  > span:active {
    background-color: ${(props) => props.theme.Colors.Components.Interaction.Pressed};
  }
  
  > span#${(props) => props.seat} {
    background-color: ${(props) => props.theme.Colors.Components.Translucent.Primary};
  }
`;

function StaySection() {
  const [seat, setSeat] = useState<string | null>(null);
  const [seatSelectOpen, setSeatSelectOpen] = useState<boolean>(false);

  const [stay, setStay] = useState<Stay | null>(null);
  const [stayList, setStayList] = useState<Stay[] | null>(null);

  useEffect(() => {
    getStays().then((data) => {
      setStayList(data);
      setStay(data[0]);
    });
  }, []);

  if (stayList === null) return Loading();
  if (stayList.length === 0) return (<NoStay>활성화된 잔류가 없습니다.</NoStay>);

  return (
    <>
      <StayKind>잔류 종류: <span>{stay?.name}</span></StayKind>
      <Section label="내가 선택한 좌석">
        <SeatSelect>
          <p>{seat ? seat : "미선택"}</p>
          <Button width="120px" onClick={() => setSeatSelectOpen(true)}>좌석 선택</Button>
        </SeatSelect>
      </Section>
      {seat ? null : (
        <Section label="좌석 미선택 사유">
          <Input placeholder="좌석 미선택 사유 입력"/>
        </Section>
      )}

      <Button>잔류 신청</Button>

      <SelectionDialog isOpen={seatSelectOpen} closeAction={() => setSeatSelectOpen(false)}>
        <Button style={{ margin: "8px", width: "calc(100% - 16px)" }} onClick={() => setSeat(null)}>미선택</Button>
        <Divider>&nbsp;</Divider>
        <SeatBox>
          {genTable().map((row) => (
            <SeatRow seat={seat}>
              {row.map((seat) => (<span id={seat} onClick={() => setSeat(seat)}>{seat}</span>))}
            </SeatRow>
          ))}
        </SeatBox>
      </SelectionDialog>
    </>
  );
}

export default StaySection;
