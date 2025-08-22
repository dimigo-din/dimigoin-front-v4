import {useState} from "react";
import SegmentedTabs from "../../components/SegmentedTabs.tsx";
import ContentWrapper from "../../components/Content.tsx";
import ApplySection from "./section/Apply.tsx";
import VoteSection from "./section/Vote.tsx";
import styled from "styled-components";

const InnerWrapper = styled.div`
  flex: 1;
  min-height: 0;
  
  overflow-y: auto;
`;

function WakeupPage() {
  const tabs = ["투표", "신청"];
  const [activeTab, setActiveTab] = useState("투표");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ContentWrapper>
      <SegmentedTabs
        tabs={tabs}
        onChange={(_, label) => handleTabChange(label)}
      />
      <InnerWrapper>
        { activeTab === "투표" && <VoteSection />}
        { activeTab === "신청" && <ApplySection /> }
      </InnerWrapper>
    </ContentWrapper>
  );
}

export default WakeupPage;