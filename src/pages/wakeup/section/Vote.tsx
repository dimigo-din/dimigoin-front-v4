import styled from "styled-components";
import {useEffect, useState} from "react";
import {
  getMyWakeupApplicationVotes,
  getWakeupApplications, unVoteWakeupApplication, voteWakeupApplication, type WakeupApplicationVotes,
  type WakeupApplicationWithVote
} from "../../../api/wakeup.ts";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";
import Loading from "../../../components/Loading.tsx";

import ThumbUpOn from "../../../assets/icons/thumbs/thumbup_on.svg?react";
import ThumbUp from "../../../assets/icons/thumbs/thumb_up.svg?react";
import ThumbDownOn from "../../../assets/icons/thumbs/thumb_down_on.svg?react";
import ThumbDown from "../../../assets/icons/thumbs/thumb_down.svg?react";

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
  
  background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
  
  padding: 8px 8px;

  > .left {
    display: flex;
    flex-direction: row;
    gap: 8px;
    
    > img {
      width: 20vw;
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
        color: ${({theme}) => theme.Colors.Content.Standard.Secondary};
      }
    }
  }
  
  > .right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    padding: 0 6px;
    
    > div {
      display: flex;
      flex-direction: row;
      gap: 2px;
      
      svg {
        height: 90%;

        path {
          fill: ${({theme}) => theme.Colors.Components.Translucent.Primary};
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
      
      > p {
        align-content: center;
      }
    }
  }
`;

function VoteSection() {
  const {showToast} = useNotification();

  const [musics, setMusics] = useState<WakeupApplicationWithVote[] | null>(null);
  const [myVote, setMyVote] = useState<WakeupApplicationVotes[] | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateScreen = () => {
    getWakeupApplications().then((data) => {
      setMusics(data);

      getMyWakeupApplicationVotes().then((votes) => {
        setMyVote(votes);
      }).catch((e) => {
        showToast(e.response.data.error.message || e.response.data.error, "danger");
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

  if (musics === null || myVote === null || isSubmitting) return Loading();

  return (
    <>
      <MusicBox>
        {musics.sort((a, b) => (b.up - b.down) - (a.up - a.down)).map((music) => {
          const curVote = myVote.find((vote) => vote.wakeupSongApplication.id === music.id);
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
                  {curVote && curVote.upvote ? <ThumbUpOn className={"filled"} /> : <ThumbUp /> }
                  <p>{music.up}</p>
                </div>
                <div className="down" onClick={() => curVote ? unVote(curVote.id) : vote(music.id, false)}>
                  {curVote && !curVote.upvote ? <ThumbDownOn className={"filled"} /> : <ThumbDown /> }
                  <p>{music.down}</p>
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