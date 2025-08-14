import styled from "styled-components";
import {type Applies, getApplies, getTimetables} from "../../api/user.ts";
import {useEffect, useState} from "react";
import {useNotification} from "../../providers/MobileNotifiCationProvider.tsx";
import type {Outing} from "../../api/stay.ts";
import Skeleton from "../../components/Skeleton.tsx";


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
  
  background-color: ${({theme}) => theme.Colors.Background.Primary};
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 16px;
  
  padding: 16px;
  
  > div.label {
    font-size: ${({theme}) => theme.Font.Footnote.size};
    color: ${({theme}) => theme.Colors.Content.Secondary}
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
    font-size: ${({theme}) => theme.Font.Callout.size};
    font-weight: ${({theme}) => theme.Font.Callout.weight.strong};
    color: ${({theme}) => theme.Colors.Content.Secondary}
  }
  
  > p {
    font-size: ${({theme}) => theme.Font.Headline.size};
    font-weight: ${({theme}) => theme.Font.Headline.weight.regular};
    color: ${({theme}) => theme.Colors.Core.Brand.Primary}
  }
`;

const TimelineWrapper = styled.table`
  background-color: ${({theme}) => theme.Colors.Background.Tertiary};
  
  border-collapse: collapse;
  border-radius: 12px;
  
  padding: 6px;
  margin-top: 4%;

  tr {
    border-bottom: 1px solid ${({theme}) => theme.Colors.Line.Divider};
    > td {
      text-align: center;
    }
  }
  tr.end {
    border: none !important;
  }
  thead > tr > td { height: 4dvh }
  tbody {
    tr {
      height: 5dvh;
      > td.target {
        height: 100%;
        width: calc(88% / 5);

        text-align: center;
      }
    }
  }
  td.indicator {
    color: ${({theme}) => theme.Colors.Content.Tertiary};
    border-right: 1px solid ${({theme}) => theme.Colors.Line.Divider};
  }
  td.days {
    color: ${({theme}) => theme.Colors.Core.Brand.Primary}
  }
  td.temp {
    background-color: ${({theme}) => theme.Colors.Solid.Translucent.Yellow};
  }
`;

function HomePage() {
  const {showToast} = useNotification();

  const [applies, setApplies] = useState<Applies | null>(null);
  const [outing, setOuting] = useState<Outing>();

  const [timetable, setTimetable] = useState<{content: string, temp: boolean}[][] | null>(null);

  const updateScreen = () => {
    getApplies().then((data) => {
      setApplies(data);
      setOuting(data.stayApply.outing.sort((a, b) => (new Date(a.from)).getTime() - (new Date(b.from)).getTime())[0])
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });

    getTimetables(localStorage.getItem("grade")!, localStorage.getItem("class")!).then((data) => {
      const col: {content: string, temp: boolean}[][] = [];
      data.forEach((d) => {
        d.forEach((d2, i) => {
          if (col.length === i) col.push([]);
          col[i].push(d2);
        });
      });
      setTimetable(col);
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  return (
    <CardBoxWrapper>
      {applies === null || timetable === null ? (
        <>
          <Skeleton done={false} borderRadius={"16px"} height={"calc(10dvh)"}>&nbsp;</Skeleton>
          <Skeleton done={false} borderRadius={"16px"} height={"calc(16px + 16px + 39dvh)"}>&nbsp;</Skeleton>
        </>
      ) : (
        <>
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
                    `${(new Date(outing!.from)).getHours()}:${("0" + (new Date(outing!.from)).getMinutes()).slice(-2)}~${(new Date(outing!.to)).getHours()}:${("0" + (new Date(outing!.to)).getMinutes()).slice(-2)}`
                    : "없음"}
                </p>
              </ApplyContent>
              <ApplyContent>
                <span>세탁</span>
                <p>{applies?.laundryApply ? applies?.laundryApply.laundryTime.time : "없음"}</p>
              </ApplyContent>
            </ApplyWrapper>
          </CardBox><CardBox>
            <div className="label">시간표&nbsp;&nbsp;{localStorage.getItem("grade")!}학년 {localStorage.getItem("class")!}반</div>
            <TimelineWrapper>
              <thead>
              <tr>
                {["", "월", "화", "수", "목", "금"].map((d) => {
                  return (
                    <td className={[d === "" ? "indicator" : "", "days"].join(" ")}>{d}</td>
                  );
                })}
              </tr>
              </thead>
              <tbody>
              {timetable?.map((times, i) => {
                if (i === 7) return;

                const classes = ["1", "2", "3", "4", "5", "6", "7"];
                return (
                  <tr className={[i === 6 ? "end" : ""].join(" ")}>
                    {[classes[i], ...times].map((time) => {
                      return typeof time === "string" ? (
                        <td className={"indicator"}>{time}</td>
                      ) : (
                        <td className={[time.temp ? "temp" : "", "target"].join(" ")}>{time.content.split("\n")[0]}</td>
                      );
                    })}
                  </tr>
                );
              })}
              </tbody>
            </TimelineWrapper>
          </CardBox>
        </>
      )}
    </CardBoxWrapper>
  );
}

export default HomePage;
