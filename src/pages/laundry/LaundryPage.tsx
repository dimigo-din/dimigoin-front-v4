import {useEffect, useState} from "react";
import ContentWrapper from "../../components/Content.tsx";
import styled from "styled-components";
import {
  addLaundryApply, deleteLaundryApply,
  getLaundryApplies,
  getLaundryTimeline,
  type LaundryApply,
  type LaundryMachine,
  type LaundryTimeline
} from "../../api/laundry.ts";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";
import SelectionDialog from "../../components/SelectionDialog.tsx";
import SegmentedTabs from "../../components/SegmentedTabs.tsx";
import Skeleton from "../../components/Skeleton.tsx";


const MachineKind = styled.div`
  font-size: ${({theme}) => theme.Font.Body.size};
  color: ${({theme}) => theme.Colors.Content.Secondary};

  flex: 1;
  height: 4dvh;

  border-left: 1px solid ${({theme}) => theme.Colors.Line.Outline};

  display: flex;
  align-items: center;
  
  padding: 2dvh;

  color: ${({theme}) => theme.Colors.Core.Brand.Primary};
`;

const MachineKindWrapper = styled.div`
  margin-top: -16px;

  padding: 0 0 0 2dvh;

  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 24px;

  background-color: ${({theme}) => theme.Colors.Background.Primary};

  display: flex;
  align-items: center;
  gap: 2dvh;

  > span {
    margin: auto 0;

    width: 10dvh;

    align-items: center;
    text-align: center;
    font-size: ${({theme}) => theme.Font.Body.size};
    color: ${({theme}) => theme.Colors.Content.Secondary};
  }
`;


const MachineSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  
  gap: 8px;
`;

const TargetCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
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

function LaundryPage() {
  const {showToast} = useNotification();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [timeline, setTimeline] = useState<LaundryTimeline | null>(null);
  const [applies, setApplies] = useState<LaundryApply[] | null>(null);
  const [machines, setMachines] = useState<LaundryMachine[]>([]);

  const [currentType, setCurrentType] = useState<"washer" | "dryer">("washer");
  const [currentMachine, setCurrentMachine] = useState<LaundryMachine>();

  const [openMachineSelection, setOpenMachineSelection] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateScreen = () => {
    setIsLoading(true);
    getLaundryTimeline()
      .then((data) => {
        setTimeline(data);

        const myGrade = localStorage.getItem("grade");
        const map = new Map<string, LaundryMachine>();
        data.times.forEach((time) => {
          if (String(time.grade) === myGrade) {
            time.assigns.forEach((m) => {
              if (!map.has(m.id)) map.set(m.id, m);
            });
          }
        });

        const list = Array.from(map.values());
        setMachines(list);

        if (!currentMachine && list.length > 0) {
          setCurrentMachine(list.find((m) => m.type === currentType));
        }

        return getLaundryApplies();
      })
      .then((data) => {
        setApplies(data);
        // const my = data.find((d) => d.user.id === localStorage.getItem("id"));
        // if (my) setCurrentMachine(my.laundryMachine);
      })
      .catch((e) => {
        showToast(e.response?.data?.error?.message || e.response?.data?.error || String(e), "danger");
      }).finally(() => {
        setIsLoading(false)
    });
  };

  const addApply = (time_id: string) => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    showToast("신청중입니다...", "info");
    addLaundryApply(time_id, currentMachine!.id).then(() => {
      showToast("신청되었습니다.", "info");
      updateScreen();
    }).catch((e) => {
      console.log(e);
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  const deleteApply = (target: "me" | "other") => {
    if (target === 'other') return;

    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    deleteLaundryApply().then(() => {
      showToast("신청 취소되었습니다.", "info");
      updateScreen();
    }).catch((e) => {
      console.log(e);
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  useEffect(() => {
    setCurrentMachine(machines.find((m) => m.type === currentType));
  }, [currentType])

  return (
    <ContentWrapper>
      <SegmentedTabs
        tabs={["세탁기", "건조기"]}
        onChange={(_, label) => setCurrentType(label === "세탁기" ? "washer" : "dryer")}
      />
      {(timeline === null || applies === null || isLoading) ? (
          <>
            <Skeleton done={false} height={"2dvh"}>&nbsp;</Skeleton>
            <Skeleton done={false} height={"6dvh"}>&nbsp;</Skeleton>
            <Skeleton done={false} height={"6dvh"}>&nbsp;</Skeleton>
            <Skeleton done={false} height={"6dvh"}>&nbsp;</Skeleton>
            <Skeleton done={false} height={"6dvh"}>&nbsp;</Skeleton>
          </>
        ) : (
        <>
          <MachineKindWrapper>
            <span>세탁/건조기</span>
            <MachineKind onClick={() => setOpenMachineSelection(true)}>{currentMachine?.name} {currentMachine?.type === "washer" ? "세탁기" : "건조기"}</MachineKind>
          </MachineKindWrapper>
          
          <TargetCardWrapper>
            {timeline && timeline.times.filter((time) => time.assigns.find((a) => a.id === currentMachine?.id) && time.grade == parseInt(localStorage.getItem("grade")!)).map((time) => {
              const [hour, minute] = time.time.split(":").map((t) => parseInt(t));
              const isAfternoon = hour / 12 >= 1;

              const apply = applies && applies.find((a) => a.laundryMachine.id === currentMachine?.id && a.laundryTime.id === time.id);
              if (apply) {
                const target = apply.user.id === localStorage.getItem("id") ? "me" : "other";
                return (
                  <TargetCard apply={target} onClick={() => deleteApply(target)}>
                    {isAfternoon ? "오후" : "오전"} {hour % 12}시 {minute}분
                  </TargetCard>
                );
              }
              return (
                <TargetCard onClick={() => addApply(time.id)}>
                  {isAfternoon ? "오후" : "오전"} {hour % 12}시 {minute}분
                </TargetCard>
              );
            })}
          </TargetCardWrapper>
        </>
      )}

      <SelectionDialog isOpen={openMachineSelection} closeAction={() => setOpenMachineSelection(false)}>
        <MachineSelectionWrapper>
          {machines.filter((m) => m.type === currentType).map((machine) => {
            return (
              <TargetCard onClick={() => {setCurrentMachine(machine);setOpenMachineSelection(false);}}>
                {machine.name} {machine.type === "washer" ? "세탁기" : "건조기"}
              </TargetCard>
            );
          })}
        </MachineSelectionWrapper>
      </SelectionDialog>
    </ContentWrapper>
  );
}

export default LaundryPage;