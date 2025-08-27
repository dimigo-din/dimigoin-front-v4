import styled from "styled-components";
import Section from "../../../components/Section";
import {Button} from "../../../styles/components/button";
import {Input} from "../../../styles/components/input";
import {useEffect, useState} from "react";
import {applyStay, deleteStayApply, getStays, type Stay, stayApplies} from "../../../api/stay.ts";
import SelectionDialog from "../../../components/SelectionDialog.tsx";

import {genTable, isInRange} from "../../../utils/staySeatUtil.ts";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";
import Divider from "../../../components/Divider.tsx";
import Skeleton from "../../../components/Skeleton.tsx";
import Down from "../../../assets/icons/updown/down.svg?react"; 

const StayKind = styled.div`
  font-size: ${({theme}) => theme.Font.Body.size};
  color: ${({theme}) => theme.Colors.Content.Secondary};

  height: 3dvh;

  display: flex;
  align-items: center;

  text-align: right;
  
  color: ${({theme}) => theme.Colors.Core.Brand.Primary};
`;

const StayKindWrapper = styled.div`
  margin-top: -16px;

  padding: 0 3dvh 0 3dvh;

  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 24px;

  background-color: ${({theme}) => theme.Colors.Background.Primary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    margin: auto 0;

    align-items: center;
    text-align: center;
    font-size: ${({theme}) => theme.Font.Body.size};
    color: ${({theme}) => theme.Colors.Content.Secondary};

    display: flex;
    flex-direction: row;

    > svg > g > path {
      fill: ${({theme}) => theme.Colors.Content.Secondary};
    }
  }
`;

const NoStay = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  font-size: ${({theme}) => theme.Font.Headline.size};
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
    
    padding: 12px 0;
    margin: 6px;
    
    background-color: ${({theme}) => theme.Colors.Background.Secondary};
    border-radius: 8px;
    
    text-align: center;
  }
  
  > span.inactive {
    filter: blur(1.2px) brightness(90%);
  }
  
  > span.taken {
    color: white;
    background-color: ${({theme}) => theme.Colors.Solid.Black};
  }
  
  > span:active {
    background-color: ${({theme}) => theme.Colors.Components.Interaction.Pressed};
  }
  
  > span#${({seat}) => seat} {
    color: white;
    
    background-color: ${({theme}) => theme.Colors.Core.Brand.Primary};
  }
`;

const StaySelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  
  gap: 8px;
`;

const TargetCard = styled.div<{apply?: "me" | "other"}>`
  padding: 14px 12px;

  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 12px;
  
  font-size: ${({theme}) => theme.Font.Callout.size};
  
  
  color: ${({theme, apply}) => apply ? theme.Colors.Solid.White : theme.Colors.Content.Primary};
  background-color: ${({theme, apply}) => 
    apply === "me" ? theme.Colors.Core.Brand.Primary :
    apply === "other" ? theme.Colors.Solid.Black :
      theme.Colors.Background.Primary
  };
`;

interface StaySectionProps {
  currentStay: Stay | null;
  setCurrentStay: (stay: Stay) => void;
}

function StaySection({ currentStay, setCurrentStay }: StaySectionProps) {
  const {showToast} = useNotification();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [targetSeat, setTargetSeat] = useState<string | null>(null);
  const [seatSelectOpen, setSeatSelectOpen] = useState<boolean>(false);
  const [staySelectOpen, setStaySelectOpen] = useState<boolean>(false);
  const [noSeatReason, setNoSeatReason] = useState<string | null>(null);

  
  const [stayList, setStayList] = useState<Stay[] | null>(null);
  const [myApply, setMyApply] = useState<string | null>(null);

  const getApply = () => {
    stayApplies().then((data2) => {
      const my = data2.find((sapply) => sapply.user.id === localStorage.getItem("id") && sapply.stay.id === currentStay?.id);
      if (my) {
        setMyApply(my.id!);
        setTargetSeat(my.stay_seat);
      }else {
        setMyApply(null);
        setTargetSeat(null);
        setNoSeatReason(null);
      }
    }).catch((e) => {
      console.log(e);
      showToast(e.response.data.error, "danger");
    });
  }

  const updateScreen = () => {
    getStays().then((data) => {
      setStayList(data);

      if(!currentStay)
        setCurrentStay(data[0]);

      getApply();
    }).catch((e) => {
      console.log(e);
      showToast(e.response.data.error, "danger");
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  useEffect(() => {
    getApply();
  }, [currentStay]);

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
        console.log(e);
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      });
    }else {
      if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
      if (!targetSeat && !noSeatReason) return showToast("좌석 미선택 사유를 입력해주세요.", "warning");

      setIsSubmitting(true);
      applyStay(currentStay!.id, targetSeat || noSeatReason!).then(() => {
        setIsSubmitting(false);
        showToast("잔류가 신청되었습니다.", "info");
        updateScreen();
      }).catch((e) => {
        setIsSubmitting(false);
        console.log(e);
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      });
    }
  }

  if (stayList && stayList.length === 0) return (<NoStay>활성화된 잔류가 없습니다.</NoStay>);

  return stayList === null ? (
    <>
      <Skeleton done={false} height={"inherit"}>&nbsp;</Skeleton>
      <Skeleton done={false} height={"inherit"}>&nbsp;</Skeleton>
      <Skeleton done={false} height={"12dvh"}>&nbsp;</Skeleton>
    </>
  ) : (
    <>
      <StayKindWrapper onClick={() => setStaySelectOpen(true)}>
        <span>잔류 종류<Down/></span> 
        <StayKind>{currentStay?.name}</StayKind>
      </StayKindWrapper>
      <Section label="내가 선택한 좌석">
        <SeatSelect>
          <p>{targetSeat ? targetSeat : "미선택"}</p>
          <Button width="120px" onClick={() => setSeatSelectOpen(true)}>좌석 선택</Button>
        </SeatSelect>
      </Section>
      {targetSeat ? null : (
        <Section label="좌석 미선택 사유">
          <Input placeholder="좌석 미선택 사유 입력" onInput={(e) => setNoSeatReason((e.target as HTMLInputElement).value)}/>
        </Section>
      )}

      <Button onClick={() => submit()}>{myApply ? "잔류 신청 취소" : "잔류 신청"}</Button>

      <SelectionDialog isOpen={seatSelectOpen} closeAction={() => setSeatSelectOpen(false)}>
        <Button style={{ margin: "8px", width: "calc(100% - 16px)" }} onClick={() => {setTargetSeat(null);setSeatSelectOpen(false);}}>미선택</Button>
        <Divider />
        <SeatBox>
          {(() => {
            const table = genTable();
            const groupedRows: string[][][] = [];
            for (let i = 0; i < table.length; i += 2) {
              groupedRows.push(table.slice(i, i + 2));
            }
            return groupedRows.map((group, idx) => (
              <div key={idx} style={{ marginBottom: "16px" }}>
          {group.map((row, rowIdx) => (
            <SeatRow seat={targetSeat} key={rowIdx}>
              {row.map((seat, seatIdx) => {
                const isActive = currentStay?.stay_seat_preset.stay_seat.some((target) => isInRange(target.range.split(":"), seat) && target.target === `${localStorage.getItem("grade")}_${localStorage.getItem("gender")}`);
                const taken = currentStay?.stay_apply.find((sapply) => sapply.stay_seat === seat);
                return (
            <span
              id={seat}
              key={seat}
              className={[isActive ? "active" : "inactive", taken && taken.user.id !== localStorage.getItem("id") ? "taken" : "notTaken"].join(" ")}
              onClick={isActive ? () => {setTargetSeat(seat);setSeatSelectOpen(false);} : (e) => {e.preventDefault();e.stopPropagation()}}
              style={{
                marginRight: (seatIdx + 1) % 9 === 0 && seatIdx !== row.length - 1 ? "20px" : undefined
              }}>
              {taken && taken.user.id !== localStorage.getItem("id") ? taken.user.name.replace(/[0-9]/g, "") : seat}
            </span>
                )
              })}
            </SeatRow>
          ))}
              </div>
            ));
          })()}
        </SeatBox>
        
      </SelectionDialog>

 {/* 잔류 선택 만들기 */}
      <SelectionDialog isOpen={staySelectOpen} closeAction={() => setStaySelectOpen(false)}>
        <StaySelectionWrapper>
          {stayList.map((stay) => {
            return (
              <TargetCard onClick={() => {setCurrentStay(stay); setStaySelectOpen(false);}}>
                {stay.name}
              </TargetCard>
            );
          })}
        </StaySelectionWrapper>
      </SelectionDialog>
    </>
  );
}

export default StaySection;
