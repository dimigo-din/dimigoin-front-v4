import {useEffect, useState} from "react";
import SegmentedTabs from "../../components/SegmentedTabs.tsx";
import ContentWrapper from "../../components/Content.tsx";
import ApplySection from "./section/Apply.tsx";
import VoteSection from "./section/Vote.tsx";
import styled from "styled-components";
import { KindItem, KindWrapper } from "../../components/KindSelection.tsx";
import { getWakeUpHistory, type WakeupHistory } from "../../api/wakeup.ts";
import Skeleton from "../../components/Skeleton.tsx";

const InnerWrapper = styled.div`
  flex: 1;
  min-height: 0;
  
  overflow-y: auto;
`;

function WakeupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<WakeupHistory | null>(null);

  const tabs = ["투표", "신청"];
  const [activeTab, setActiveTab] = useState("투표");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const updateScreen = () => {
    setIsLoading(true);
    getWakeUpHistory(localStorage.getItem("gender") as "male" | "female").then((data) => {
      setHistory(data);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  return (
    <ContentWrapper>
      <SegmentedTabs
        tabs={tabs}
        onChange={(_, label) => handleTabChange(label)}
      />
      {isLoading ? (
        <Skeleton done={false} height={"3dvh"} children={undefined}/>
      ) : history && (
        <KindWrapper onClick={() => {window.open(`https://www.youtube.com/watch?v=${history.video_id}`, "_blank")}}>
          <span>오늘의 기상곡</span>
          <KindItem>{history.video_title}</KindItem>
        </KindWrapper>
      )}
      <InnerWrapper>
        { activeTab === "투표" && <VoteSection />}
        { activeTab === "신청" && <ApplySection /> }
      </InnerWrapper>
    </ContentWrapper>
  );
}

export default WakeupPage;