import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";
import Section from "../../../components/Section.tsx";
import {Input} from "../../../styles/components/input.ts";
import SegmentedTabs from "../../../components/SegmentedTabs.tsx";
import {useEffect, useState} from "react";
import {Button} from "../../../styles/components/button.ts";
import {applyFrigo, deleteFrigo, type Frigo, getFrigo} from "../../../api/frigo.ts";
import Skeleton from "../../../components/Skeleton.tsx";

function FrigoSection() {
  const {showToast} = useNotification();
  const frigoTiming = {"종례 후": "afterschool", "저녁시간": "dinner", "야자1뒤": "after_1st_study", "야자2뒤": "after_2nd_study"}

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [appliedFrigo, setAppliedFrigo] = useState<Frigo | null | undefined>(undefined);
  const [selectedFrigoTimeing, setSelectedFrigoTiming] = useState<string>("종례 후");

  const [reason, setReason] = useState<string | undefined>(undefined);

  const updateScreen = () => {
    getFrigo().then((data) => {
      if (data) {
        setAppliedFrigo(data);
        setReason(data.reason);
      }else {
        setAppliedFrigo(null);
        setReason(undefined);
      }
    });
  }

  const apply = () => {
    if (appliedFrigo) {
      if (isSubmitting) return showToast("이미 신청 취소중입니다. 잠시만 기다려주세요.", "warning");
      setIsSubmitting(true);
      deleteFrigo().then(() => {
        showToast("금요귀가가 신청이 취소되었습니다.", "info");
        updateScreen();
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      }).finally(() => {
        setIsSubmitting(false);
      });
    }else {
      if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
      if (!reason) return showToast("금요귀가 신청 사유를 입력해주세요.", "warning");
      setIsSubmitting(true);
      // @ts-ignore
      applyFrigo(frigoTiming[selectedFrigoTimeing], reason).then(() => {
        showToast("금요귀가가 신청되었습니다.", "info");
        updateScreen();
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      }).finally(() => {
        setIsSubmitting(false);
      });
    }
  }

  useEffect(() => {
    updateScreen();
  }, []);

  return (
    <>
      <Section label={"금요귀가 신청 사유"}>
        <Skeleton done={appliedFrigo !== undefined} height={"5dvh"}>
          <Input placeholder={"금요귀가 신청 사유를 입력하세요."} onInput={(e) => setReason((e.target as HTMLInputElement).value)} value={reason} />
        </Skeleton>
      </Section>
      <Section label={"귀가 시간 선택"}>
        <Skeleton done={appliedFrigo !== undefined} height={"4dvh"}>
          <SegmentedTabs
            tabs={Object.keys(frigoTiming)}
            onChange={(_, label) => setSelectedFrigoTiming(label)}
            fontSize={"Body"}
            defaultIndex={0}
            force={appliedFrigo ? Object.values(frigoTiming).indexOf(appliedFrigo.timing) : null}
          />
        </Skeleton>
      </Section>
      <Button onClick={() => apply()}>{appliedFrigo ? "취소하기" : "신청하기"}</Button>
    </>
  );
}

export default FrigoSection;