import {useState} from "react";
import ContentWrapper from "../../components/Content";

import SegmentedTabs from "../../components/SegmentedTabs";

import StaySection from "./section/Stay";
import OutingSection from "./section/Outing.tsx";
import FrigoSection from "./section/Frigo.tsx";
import type { Stay } from "../../api/stay.ts";

function StayPage() {
  const [currentStay, setCurrentStay] = useState<Stay | null>(null);
  
  const tabs = ["잔류", "외출", "금귀"];
  const [activeTab, setActiveTab] = useState("잔류");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ContentWrapper>
      <SegmentedTabs
        tabs={tabs}
        onChange={(_, label) => handleTabChange(label)}
      />
      {activeTab === "잔류" && <StaySection currentStay={currentStay} setCurrentStay={setCurrentStay} />}
      {activeTab === "외출" && <OutingSection currentStay={currentStay} />}
      {activeTab === "금귀" && <FrigoSection />}
    </ContentWrapper>
  );
}

export default StayPage;
