import styled from "styled-components";
import {type Applies, getApplies} from "../../api/user.ts";
import {useEffect, useState} from "react";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";
import type {Outing} from "../../api/stay.ts";


const CardBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  height: 100%;
  width: 100%;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  
  background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 16px;
  
  padding: 16px;
  
  > div.label {
    font-size: ${({theme}) => theme.Font.Footnote.size};
    color: ${({theme}) => theme.Colors.Content.Standard.Secondary}
  }
`;

const ApplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ApplyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  text-align: center;
  
  padding-top: 12px;
  
  gap: 6px;
  
  > span {
    font-size: ${({theme}) => theme.Font.Footnote.size};
    font-weight: ${({theme}) => theme.Font.Footnote.weight.strong};
    color: ${({theme}) => theme.Colors.Content.Standard.Secondary}
  }
  
  > p {
    font-size: ${({theme}) => theme.Font.Body.size};
    font-weight: ${({theme}) => theme.Font.Body.weight.regular};
    color: ${({theme}) => theme.Colors.Core.Brand.Primary}
  }
`;

function HomePage() {
  const {showToast} = useNotification();

  const [applies, setApplies] = useState<Applies | null>(null);
  const [outing, setOuting] = useState<Outing>();

  const updateScreen = () => {
    getApplies().then((data) => {
      setApplies(data);
      setOuting(data.stayApply.outing.sort((a, b) => (new Date(a.from)).getTime() - (new Date(b.from)).getTime())[0])
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  return (
    <CardBoxWrapper>
      <CardBox>
        <div className="label">내 신청</div>
        <ApplyWrapper>
          <ApplyContent>
            <span>내 좌석</span>
            <p>{applies?.stayApply ? applies?.stayApply.stay_seat : "없음"}</p>
          </ApplyContent>
          <ApplyContent>
            <span>외출시간</span>
            <p>
              {applies?.stayApply && applies.stayApply.outing.length > 0 ?
              `${(new Date(outing!.from)).getHours()}:${("0"+(new Date(outing!.from)).getMinutes()).slice(-2)}~${(new Date(outing!.to)).getHours()}:${("0"+(new Date(outing!.to)).getMinutes()).slice(-2)}`
              : "없음"}
            </p>
          </ApplyContent>
          <ApplyContent>
            <span>세탁</span>
            <p>{applies?.laundryApply ? applies?.laundryApply.laundryTime.time : "없음"}</p>
          </ApplyContent>
        </ApplyWrapper>
      </CardBox>
    </CardBoxWrapper>
  );
}

export default HomePage;
