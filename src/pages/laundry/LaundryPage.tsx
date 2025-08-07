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
import Loading from "../../components/Loading.tsx";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";
import SelectionDialog from "../../components/SelectionDialog.tsx";

const MachineKind = styled.div`
  font-size: ${({theme}) => theme.Font.Body.size};
  color: ${({theme}) => theme.Colors.Content.Secondary};
  
  > span {
    color: ${({theme}) => theme.Colors.Core.Brand.Primary};
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
  
  
  color: ${({theme, apply}) => apply ? theme.Colors.Solid.White : theme.Colors.Solid.Black};
  background-color: ${({theme, apply}) => 
    apply === "me" ? theme.Colors.Core.Brand.Primary :
    apply === "other" ? theme.Colors.Solid.Black :
      theme.Colors.Background.Primary
  };
`;

function LaundryPage() {
  const {showToast} = useNotification();

  const [timeline, setTimeline] = useState<LaundryTimeline | null>(null);
  const [applies, setApplies] = useState<LaundryApply[] | null>(null);
  const [machines, setMachines] = useState<LaundryMachine[]>([]);

  const [currentMachine, setCurrentMachine] = useState<LaundryMachine>();

  const [openMachineSelection, setOpenMachineSelection] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateScreen = () => {
    getLaundryTimeline().then((data) => {
      setTimeline(data);

      setMachines([]);
      data.times.forEach((time) => {
        const newMachines = time.assigns.filter(({ id }) => !machines.find((m) => m.id === id));
        setMachines(machines.concat(newMachines));
      });
      if (data.times.length > 0 && data.times[0].assigns.length > 0 && !currentMachine) {
        setCurrentMachine(data.times[0].assigns[0]);
      }

      getLaundryApplies().then((data) => {
        setApplies(data);
        const my = data.find((d) => d.user.id === localStorage.getItem("id"));
        if (my) {
          setCurrentMachine(my.laundryMachine);
        }
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      });
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });
  }

  const addApply = (time_id: string) => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    addLaundryApply(time_id, currentMachine!.id).then(() => {
      showToast("신청되었습니다..", "info");
      updateScreen();
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  const deleteApply = () => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    deleteLaundryApply().then(() => {
      showToast("신청 취소되었습니다..", "info");
      updateScreen();
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  return (
    <ContentWrapper>
      <MachineKind onClick={() => setOpenMachineSelection(true)}>세탁/건조기: <span>{currentMachine?.name} {currentMachine?.type === "washer" ? "세탁기" : "건조기"}</span></MachineKind>
      <TargetCardWrapper>
        {timeline && timeline.times.filter((time) => time.assigns.find((a) => a.id === currentMachine?.id) && time.grade == parseInt(localStorage.getItem("grade")!)).map((time) => {
          const [hour, minute] = time.time.split(":").map((t) => parseInt(t));
          const isAfternoon = hour / 12 >= 1;

          const apply = applies && applies.find((a) => a.laundryMachine.id === currentMachine?.id && a.laundryTime.id === time.id);
          if (apply) {
            const target = apply.user.id === localStorage.getItem("id") ? "me" : "other";
            return (
              <TargetCard apply={target} onClick={() => deleteApply()}>
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

      <SelectionDialog isOpen={openMachineSelection} closeAction={() => setOpenMachineSelection(false)}>
        <MachineSelectionWrapper>
          {machines.map((machine) => {
            return (
              <TargetCard onClick={() => {setCurrentMachine(machine);setOpenMachineSelection(false);}}>
                {machine.name} {machine.type === "washer" ? "세탁기" : "건조기"}
              </TargetCard>
            );
          })}
        </MachineSelectionWrapper>
      </SelectionDialog>
      {(timeline === null || applies === null) && Loading()}
    </ContentWrapper>
  );
}

export default LaundryPage;