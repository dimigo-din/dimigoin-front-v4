import { useState } from "react";
import ContentWrapper from "../../components/Content";

import SegmentedTabs from "../../components/SegmentedTabs";

import StaySection from "./section/Stay";

function StayPage() {
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
            {activeTab === "잔류" && <StaySection />}
        </ContentWrapper>
    );
}

export default StayPage;
