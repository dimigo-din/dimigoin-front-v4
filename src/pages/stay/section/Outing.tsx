import SegmentedTabs from "../../../components/SegmentedTabs.tsx";
import {useEffect, useState} from "react";
import {
  addStayOuting, deleteStayOuting, editStayOuting,
  getStayOuting,
  type Outing,
  stayApplies,
  type StayApply
} from "../../../api/stay.ts";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";
import styled from "styled-components";
import Loading from "../../../components/Loading.tsx";
import SelectionDialog from "../../../components/SelectionDialog.tsx";
import {Button, LightButton} from "../../../styles/components/button.ts";
import Section from "../../../components/Section.tsx";
import {Input} from "../../../styles/components/input.ts";

import CheckBoxOn from "../../../assets/icons/check_box_checked.svg?react"
import {generateDateList} from "../../../utils/extarctBetweenDay.ts";

const OutingWrapper = styled.div`
  flex: 1;
  min-height: 0;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  gap: 2%;
  
  border-radius: 12px;
`;

const NoOuting = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  font-size: ${({theme}) => theme.Font.Headline.size};
`;

const OutingBox = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    display: none; // android webview
  }
  scrollbar-width: none; // standard
`;

const OneLittleOuting = styled.div`
  width: 100%;
  
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 12px;
  background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
  
  padding: 16px 16px;
  
  align-content: center;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  > .left {
    > .reason {
      font-size: ${({theme}) => theme.Font.Body.size};
      color: ${({theme}) => theme.Colors.Content.Standard.Primary};
    }
    
    > time {
      font-size: ${({theme}) => theme.Font.Callout.size};
      color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
    }
  }
  
  .right {
    width: 35%;
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    
    align-items: center;

    font-size: ${({theme}) => theme.Font.Footnote.size};
    color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
  }
`;

const OutingAddWrapper = styled.div`
  height: fit-content;
  
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  padding: 8px 12px;
  margin-top: 8px;

  input {
    height: 7vh;

    font-size: ${({theme}) => theme.Font.Body.size};
    color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
  }
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  width: 100%;
  
  > p {
    font-size: ${({theme}) => theme.Font.Headline.size};
    color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
    align-content: center;
  }
`;

const CheckBox = styled.div<{ canceled: boolean }>`
  height: 7vh;
  width: 32%;
  
  border-radius: 12px;
  background-color: ${({theme}) => theme.Colors.Solid.White};
  border: 1px solid ${({theme, canceled}) => canceled ? theme.Colors.Core.Brand.Primary : theme.Colors.Line.Outline};
  color: ${({theme}) => theme.Colors.Content.Standard.Primary};
  font-size: ${({theme}) => theme.Font.Paragraph_Large.size};
  line-height: ${({theme}) => theme.Font.Paragraph_Large.lineHeight};
  font-weight: ${({theme, canceled}) => canceled ? theme.Font.Paragraph_Large.weight.regular : theme.Font.Paragraph_Large.weight.weak};
  transition: border-color 0.3s ease, font-weight 0.3s ease;
  
  display: flex;
  gap: 6%;
  align-items: center;
  justify-content: center;
  
  path {
    fill: ${({theme, canceled}) => canceled ? theme.Colors.Core.Brand.Primary : theme.Colors.Line.Outline};
    transition: fill 0.3s ease;
  }
`;

function OutingSection() {
  const {showToast} = useNotification();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [applies, setApplies] = useState<StayApply[] | null>(null);
  const [currentApply, setCurrentApply] = useState<StayApply | null>(null);

  const [outingDays, setOutingDays] = useState<string[]>([]);
  const [activeOutingDay, setActiveOutingDay] = useState<string>();
  const [outings, setOutings] = useState<Outing[] | null>(null);

  const [editOrDeleteTarget, setEditOrDeleteTarget] = useState<string | null>(null);

  const [openOutingAddDialog, setOpenOutingAddDialog] = useState<boolean>(false);
  const [openIsEditOrDeleteAddDialog, setOpenIsEditOrDeleteAddDialog] = useState<boolean>(false);

  // apply dialogconst [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [outingStart, setOutingStart] = useState<string | undefined>(undefined);
  const [outingEnd, setOutingEnd] = useState<string | undefined>(undefined);
  const [outingReason, setOutingReason] = useState<string | undefined>(undefined);
  const [outingMealCancel_Breakfast, setOutingMealCancel_Breakfast] = useState<boolean>(false);
  const [outingMealCancel_Lunch, setOutingMealCancel_Lunch] = useState<boolean>(false);
  const [outingMealCancel_Dinner, setOutingMealCancel_Dinner] = useState<boolean>(false);

  const updateScreen = () => {
    stayApplies().then((stayApplyList) => {
      if (stayApplyList.length > 0) {

        setApplies(stayApplyList);
        setCurrentApply(stayApplyList[0]);

        const days = generateDateList(stayApplyList[0].stay.stay_from, stayApplyList[0].stay.stay_to);
        setOutingDays(days);
        setActiveOutingDay(activeOutingDay || days[0]);
        console.log(activeOutingDay)

        getStayOuting(stayApplyList[0].id).then((data) => {
          setOutings(data);
        }).catch((e) => {
          showToast(e.response.data.error.message || e.response.data.error, "danger");
        });
      }else {
        setApplies([]);
        setOutings([]);
      }
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  useEffect(() => {
    if (!openIsEditOrDeleteAddDialog) setEditOrDeleteTarget(null);
  }, [openIsEditOrDeleteAddDialog]);

  useEffect(() => {
    if (!openOutingAddDialog) {
      setEditTarget(null);
      setOutingStart(undefined);
      setOutingEnd(undefined);
      setOutingReason(undefined);
      setOutingMealCancel_Breakfast(false);
      setOutingMealCancel_Lunch(false);
      setOutingMealCancel_Dinner(false);
    }
  }, [openOutingAddDialog]);

  const handleTabChange = (tab: string) => {
    setActiveOutingDay(tab);
  };

  const apply = () => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");

    if (!outingReason) return showToast("외출 사유를 작성해주세요.", "warning");
    if (!outingStart) return showToast("외출 시작시간을 입력해주세요.", "warning");
    if (!outingEnd) return showToast("외출 종료시간을 입력해주세요.", "warning");

    setIsSubmitting(true);
    const from = `${activeOutingDay}T${outingStart}:00+09:00`;
    const fromDate = new Date(from);
    const to = `${activeOutingDay}T${outingEnd}:00+09:00`;
    const toDate = new Date(to);
    console.log(fromDate)
    if (fromDate.getTime() > toDate.getTime())
      toDate.setTime(toDate.getTime() + 24 * 60 * 60 * 1000);

    if (editTarget) {
      editStayOuting(editTarget, outingReason, fromDate.toISOString(), toDate.toISOString(), outingMealCancel_Breakfast, outingMealCancel_Lunch, outingMealCancel_Dinner).then(() => {
        showToast("수정되었습니다.", "info");

        setOpenOutingAddDialog(false);

        updateScreen();
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      }).finally(() => {
        setIsSubmitting(false);
      });
    }else {
      addStayOuting(currentApply!.id, outingReason, fromDate.toISOString(), toDate.toISOString(), outingMealCancel_Breakfast, outingMealCancel_Lunch, outingMealCancel_Dinner).then(() => {
        showToast("신청되었습니다.", "info");

        setOpenOutingAddDialog(false);

        updateScreen();
        updateScreen();
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      }).finally(() => {
        setIsSubmitting(false);
      });
    }
  }

  const deleteOuting = (target) => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    deleteStayOuting(target).then(() => {
      showToast("삭제되었습니다.", "info");
      updateScreen();
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  if (applies === null || outings === null) return Loading();
  if (outingDays.length === 0) return (<NoOuting>외출을 신청할 수 없습니다.</NoOuting>);

  return (
      <>
        <SegmentedTabs
            tabs={outingDays}
            onChange={(_, label) => handleTabChange(label)}
            fontSize={"Body"}
        />

        <OutingWrapper>
          <OutingBox>
            {(outings ? outings : []).map((out) => {
              const timeFrom = new Date(out.from);
              const timeTo = new Date(out.to);

              if (activeOutingDay !== `${timeFrom.getFullYear()}-${("0"+(timeFrom.getUTCMonth()+1)).slice(-2)}-${("0"+(timeFrom.getDate())).slice(-2)}`) return null;

              const from = `${timeFrom.getHours() > 12 ? "오후" : "오전"} ${("0"+(timeFrom.getHours() % 12)).slice(-2)}:${("0"+timeFrom.getMinutes()).slice(-2)}`
              const to = `${timeTo.getHours() > 12 ? "오후" : "오전"} ${("0"+(timeTo.getHours() % 12)).slice(-2)}:${("0"+timeTo.getMinutes()).slice(-2)}`

              return (
                <OneLittleOuting onClick={() => {setEditOrDeleteTarget(out.id);setOpenIsEditOrDeleteAddDialog(true);}}>
                  <div className={"left"}>
                    <div className="reason">
                      {out.reason}
                    </div>
                    <time className={"time"}>{from} ~ {to}</time>
                  </div>
                  <div className={"right"}>
                    <p>아침{out.breakfast_cancel ? "X" : "O"}</p>
                    <p>점심{out.lunch_cancel ? "X" : "O"}</p>
                    <p>저녁{out.dinner_cancel ? "X" : "O"}</p>
                  </div>
                </OneLittleOuting>
              )
            })}
          </OutingBox>
          <Button onClick={() => setOpenOutingAddDialog(true)}>외출 추가</Button>
        </OutingWrapper>

        <SelectionDialog isOpen={openOutingAddDialog} closeAction={() => {setOpenOutingAddDialog(false);setEditTarget(null)}}
                         onOpen={() => {
                           if (editTarget) {
                             const target: Outing = outings.find((o) => o.id === editTarget)!;
                             const from = new Date(target.from);
                             const to = new Date(target.to);
                             setOutingStart(`${("0"+from.getHours()).slice(-2)}:${("0"+from.getMinutes()).slice(-2)}`);
                             setOutingEnd(`${("0"+to.getHours()).slice(-2)}:${("0"+to.getMinutes()).slice(-2)}`);
                             setOutingReason(target.reason);
                             setOutingMealCancel_Breakfast(target.breakfast_cancel);
                             setOutingMealCancel_Lunch(target.lunch_cancel);
                             setOutingMealCancel_Dinner(target.dinner_cancel);
                           }
                         }}>
          <OutingAddWrapper>
            <Section label="신청 시간">
              <InputRow>
                <Input type={"time"} onInput={(e) => setOutingStart((e.target as HTMLInputElement).value)} value={outingStart} />
                <p>~</p>
                <Input type={"time"} onInput={(e) => setOutingEnd((e.target as HTMLInputElement).value)} value={outingEnd} />
              </InputRow>
            </Section>
            <Section label={"신청 사유"}>
              <Input onInput={(e) => setOutingReason((e.target as HTMLInputElement).value)} value={outingReason} />
            </Section>
            <Section label={"급식 취소"}>
              <InputRow>
                <CheckBox canceled={outingMealCancel_Breakfast}
                          onClick={() => setOutingMealCancel_Breakfast(!outingMealCancel_Breakfast)}>
                  <CheckBoxOn />
                  <p>아침 취소</p>
                </CheckBox>
                <CheckBox canceled={outingMealCancel_Lunch}
                          onClick={() => setOutingMealCancel_Lunch(!outingMealCancel_Lunch)}>
                  <CheckBoxOn />
                  <p>점심 취소</p>
                </CheckBox>
                <CheckBox canceled={outingMealCancel_Dinner}
                          onClick={() => setOutingMealCancel_Dinner(!outingMealCancel_Dinner)}>
                  <CheckBoxOn />
                  <p>저녁 취소</p>
                </CheckBox>
              </InputRow>
            </Section>
            {currentApply?.stay.outing_day.includes(activeOutingDay) ? (
              <Button type={"normal"} onClick={() => {
                setOutingStart("10:20");
                setOutingEnd("14:00");
                setOutingReason("자기계발외출");
                setOutingMealCancel_Lunch(true);
              }}>
                자기계발외출
              </Button>
            ) : null}
            <Button onClick={() => apply()}>{editTarget ? "수정하기" : "신청하기"}</Button>
          </OutingAddWrapper>
        </SelectionDialog>

        <SelectionDialog isOpen={openIsEditOrDeleteAddDialog} closeAction={() => setOpenIsEditOrDeleteAddDialog(false)}>
          <InputRow style={{ padding: "12px" }}>
            <Button type={"normal"}  width={"49%"} onClick={() => { setEditTarget(editOrDeleteTarget); setEditOrDeleteTarget(null); setOpenOutingAddDialog(true); setOpenIsEditOrDeleteAddDialog(false);}}>수정하기</Button>
            <LightButton type={"danger"}  width={"49%"} onClick={() => { deleteOuting(editOrDeleteTarget); setEditOrDeleteTarget(null); setOpenIsEditOrDeleteAddDialog(false); }}>삭제하기</LightButton>
          </InputRow>
        </SelectionDialog>
      </>
  )
}

export default OutingSection;