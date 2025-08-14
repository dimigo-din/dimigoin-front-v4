import styled from "styled-components";
import {useEffect, useState} from "react";
import {
  getMyWakeupApplicationVotes,
  getWakeupApplications, unVoteWakeupApplication, voteWakeupApplication, type WakeupApplicationVotes,
  type WakeupApplicationWithVote
} from "../../../api/wakeup.ts";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";

import Up from "../../../assets/icons/updown/up.svg?react";
import Down from "../../../assets/icons/updown/down.svg?react";
import Skeleton from "../../../components/Skeleton.tsx";

const MusicBox = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 8px;
`;

const MusicCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 12px;
  
  background-color: ${({theme}) => theme.Colors.Background.Primary};
  
  padding: 8px 8px;

  > .left {
    display: flex;
    flex-direction: row;
    gap: 8px;
    
    > img {
      height: 8dvh;
      border-radius: 8px;
    }

    > .details {
      display: flex;
      flex-direction: column;

      > .title {
        font-size: ${({theme}) => theme.Font.Callout.size};
      }

      > .author {
        font-size: ${({theme}) => theme.Font.Footnote.size};
        color: ${({theme}) => theme.Colors.Content.Secondary};
      }
    }
  }
  
  > .right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    align-items: end;
    
    padding: 0 6px;
    
    > div {
      display: flex;
      flex-direction: row;
      gap: 2px;
      
      svg 
        path {
          fill: ${({theme}) => theme.Colors.Content.Tertiary};
          transform: scale(1.4);
          transform-origin: center;
        }
      }
      
      svg.filled {
        path {
          fill: ${({theme}) => theme.Colors.Core.Brand.Primary};
        }
        
        ~ p {
          color: ${({theme}) => theme.Colors.Core.Brand.Primary};
        }
      }
      
      p {
        align-content: center;
        color: ${({theme}) => theme.Colors.Content.Secondary}
      }
    }
  }
`;

function VoteSection() {
  const {showToast} = useNotification();

  const [musics, setMusics] = useState<WakeupApplicationWithVote[] | null>(null);
  const [myVote, setMyVote] = useState<WakeupApplicationVotes[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateScreen = () => {
    setIsLoading(true);
    getWakeupApplications().then((data) => {
      getMyWakeupApplicationVotes().then((votes) => {
        setMusics(data);
        setMyVote(votes);
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
      }).finally(() => {
        setIsLoading(false);
      });
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    });
  }

  useEffect(() => {
    updateScreen();
  }, []);

  const vote = (id: string, upVote: boolean) => {
    if (isSubmitting) return showToast("이미 투표중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    voteWakeupApplication(id, upVote).then(() => {
      showToast("투표에 성공하였습니다.", "info");
      updateScreen();
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  const unVote = (id: string) => {
    if (isSubmitting) return showToast("이미 삭제중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    unVoteWakeupApplication(id).then(() => {
      showToast("투표 취소에 성공하였습니다.", "info");
      updateScreen();
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return musics === null || myVote === null || isSubmitting || isLoading ? (
      <>
        <Skeleton done={false} height={"9dvh"}>&nbsp;</Skeleton>
        <br/>
        <Skeleton done={false} height={"9dvh"}>&nbsp;</Skeleton>
        <br/>
        <Skeleton done={false} height={"9dvh"}>&nbsp;</Skeleton>
        <br/>
        <Skeleton done={false} height={"9dvh"}>&nbsp;</Skeleton>
      </>
    ) : (
    <>
      <MusicBox>
        {musics && musics.sort((a, b) => (b.up - b.down) - (a.up - a.down)).map((music) => {
          const curVote = myVote ? myVote.find((vote) => vote.wakeupSongApplication.id === music.id) : undefined;
          return (
            <MusicCard>
              <div className="left">
                <img src={music.video_thumbnail} alt=""/>
                <div className="details">
                  <p className="title">{music.video_title.substring(0, 20)}{music.video_title.length > 20}...</p>
                  <p className="author">{music.video_channel}</p>
                </div>
              </div>
              <div className="right">
                <div className="up" onClick={() => curVote ? unVote(curVote.id) : vote(music.id, true)}>
                  <p>{music.up}</p>
                  <Up className={curVote && curVote.upvote ? "filled" : "notfilled"} />
                </div>
                <div className="down" onClick={() => curVote ? unVote(curVote.id) : vote(music.id, false)}>
                  <p>{music.down}</p>
                  <Down className={curVote && !curVote.upvote ? "filled" : "notfilled"} />
                </div>
              </div>
            </MusicCard>
          );
        })}
      </MusicBox>
    </>
  );
}

export default VoteSection;