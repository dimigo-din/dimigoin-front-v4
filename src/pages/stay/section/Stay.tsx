import styled from "styled-components";
import Section from "../../../components/Section";
import {Button} from "../../../styles/components/button";
import {Input} from "../../../styles/components/input";
import {useEffect, useState} from "react";
import {applyStay, deleteStayApply, getStays, type Stay} from "../../../api/stay.ts";
import SelectionDialog from "../../../components/SelectionDialog.tsx";
import Loading from "../../../components/Loading.tsx";

import {genTable, isInRange} from "../../../utils/staySeatUtil.ts";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";

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

const SeatRow = styled.div<{seat: string | null}>`
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
  
  > span.inactive {
    filter: blur(1.2px) brightness(90%);
  }
  
  > span:active {
    background-color: ${(props) => props.theme.Colors.Components.Interaction.Pressed};
  }
  
  > span#${(props) => props.seat} {
    color: white;
    
    background-color: ${(props) => props.theme.Colors.Core.Brand.Primary};
  }
`;

function StaySection() {
  const {showToast} = useNotification();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [targetSeat, setTargetSeat] = useState<string | null>(null);
  const [seatSelectOpen, setSeatSelectOpen] = useState<boolean>(false);
  const [noSeatReason, setNoSeatReason] = useState<string | null>(null);

  const [stay, setStay] = useState<Stay | null>(null);
  const [stayList, setStayList] = useState<Stay[] | null>(null);
  const [myApply, setMyApply] = useState<string | null>(null);

  const updateScreen = () => {
    getStays().then((data) => {
      setStayList(data);
      setStay(data[0]);

      const my = data[0].stay_apply.find((sapply) => sapply.user.id === localStorage.getItem("id"));
      if (my) {
        setMyApply(my.id!);
        setTargetSeat(my.stay_seat);
      }else {
        setMyApply(null);
        setTargetSeat(null);
      }
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  const submit = () => {
    if (myApply) {
      if (isSubmitting) return showToast("이미 신청 취소중입니다. 잠시만 기다려주세요.", "warning");

      setIsSubmitting(true);
      deleteStayApply(myApply).then(() => {
        setIsSubmitting(false);
        showToast("잔류가 신청이 취소되었습니다.", "info");
        updateScreen();
      }).catch((e) => {
        setIsSubmitting(false);
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      });
    }else {
      if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
      if (!targetSeat && !noSeatReason) return showToast("좌석 미선택 사유를 입력해주세요.", "warning");

      setIsSubmitting(true);
      applyStay(stay!.id, targetSeat || noSeatReason!).then(() => {
        setIsSubmitting(false);
        showToast("잔류가 신청되었습니다.", "info");
        updateScreen();
      }).catch((e) => {
        setIsSubmitting(false);
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      });
    }
  }

  if (stayList === null) return Loading();
  if (stayList.length === 0) return (<NoStay>활성화된 잔류가 없습니다.</NoStay>);

  return (
    <>
      <StayKind>잔류 종류: <span>{stay?.name}</span></StayKind>
      <Section label="내가 선택한 좌석">
        <SeatSelect>
          <p>{targetSeat ? targetSeat : "미선택"}</p>
          <Button width="120px" onClick={() => setSeatSelectOpen(true)}>좌석 선택</Button>
        </SeatSelect>
      </Section>
      {targetSeat ? null : (
        <Section label="좌석 미선택 사유">
          <Input placeholder="좌석 미선택 사유 입력" onKeyUp={(e) => setNoSeatReason((e.target as HTMLInputElement).value)}/>
        </Section>
      )}

      <Button onClick={() => submit()}>{myApply ? "잔류 신청 취소" : "잔류 신청"}</Button>

      <SelectionDialog isOpen={seatSelectOpen} closeAction={() => setSeatSelectOpen(false)}>
        <Button style={{ margin: "8px", width: "calc(100% - 16px)" }} onClick={() => setTargetSeat(null)}>미선택</Button>
        <Divider>&nbsp;</Divider>
        <SeatBox>
          {genTable().map((row) => (
            <SeatRow seat={targetSeat}>
              {row.map((seat) => { const isActive = stay?.stay_seat_preset.stay_seat.some((target) => isInRange(target.range.split(":"), seat) && target.target === `${localStorage.getItem("grade")}_${localStorage.getItem("gender")}`); return (
                <span
                  id={seat}
                  className={[isActive ? "active" : "inactive", stay?.stay_apply.some((sapply) => sapply.stay_seat === seat) ? "taken" : "notTaken"].join(" ")}
                  onClick={isActive ? () => setTargetSeat(seat) : (e) => {e.preventDefault();e.stopPropagation()}}>
                  {seat}
                </span>)}
              )}
            </SeatRow>
          ))}
        </SeatBox>
      </SelectionDialog>
    </>
  );
}

export default StaySection;
