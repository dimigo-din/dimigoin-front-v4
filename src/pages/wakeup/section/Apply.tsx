import {Input} from "../../../styles/components/input.ts";
import styled from "styled-components";
import {Button} from "../../../styles/components/button.ts";
import {useState} from "react";
import {useNotification} from "../../../providers/MobileNotifiCationProvider.tsx";
import {applyWakeupSong, searchMusic, type YoutubeItem, type YoutubeSearchResult} from "../../../api/wakeup.ts";
import SelectionDialog from "../../../components/SelectionDialog.tsx";
import Loading from "../../../components/Loading.tsx";

const MusicBox = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 8px;
`;

const MusicCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  
  border: 1px solid ${({theme}) => theme.Colors.Line.Outline};
  border-radius: 12px;
  
  background-color: ${({theme}) => theme.Colors.Background.Standard.Primary};
  
  padding: 8px 8px;

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
`;

const AreYouSure = styled.div`
  font-size: ${({theme}) => theme.Font.Body.size};
  font-weight: ${({theme}) => theme.Font.Body.weight.strong};
  color: ${({theme}) => theme.Colors.Solid.Red};
  text-align: center;

  padding: 12px;
`;

function ApplySection() {
  const {showToast} = useNotification();

  const [query, setQuery] = useState<string>("");
  const [target, setTarget] = useState<YoutubeItem>();
  const [searchResults, setSearchResults] = useState<YoutubeSearchResult>();

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [openAreYouSure, setOpenAreYouSure] = useState<boolean>(false);

  const search = () => {
    if (isSearching) return showToast("이미 검색중입니다. 잠시만 기다려주세요.", "warning");
    setIsSearching(true);

    searchMusic(query).then((data) => {
      showToast("검색완료.", "info");
      setSearchResults(data);
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSearching(false);
    });
  }

  const apply = (videoId: string) => {
    if (isSubmitting) return showToast("이미 신청중입니다. 잠시만 기다려주세요.", "warning");
    setIsSubmitting(true);

    applyWakeupSong(videoId).then(() => {
      showToast("신청되었습니다.", "info")
    }).catch((e) => {
      showToast(e.response.data.error.message || e.response.data.error, "danger");
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  if (isSubmitting || isSearching) return Loading();

  return (
    <>
      <form style={{width: "100%"}} onSubmit={(e) => {e.preventDefault();search();}}>
        <Input style={{width: "100%"}} placeholder={"검색어를 입력해주세요."} onInput={(e) => setQuery((e.target as HTMLInputElement).value)} value={query} />
      </form>
      <MusicBox>
        {searchResults && searchResults.items.map((item) => {
          return (
            <MusicCard onClick={() => {setTarget(item);setOpenAreYouSure(true)}}>
              <img src={item.snippet.thumbnails.high.url} alt=""/>
              <div className="details">
                <p className="title">{item.snippet.title.substring(0, 20)}{item.snippet.title.length > 20}...</p>
                <p className="author">{item.snippet.channelTitle}</p>
              </div>
            </MusicCard>
          );
        })}
      </MusicBox>

      <SelectionDialog isOpen={openAreYouSure} closeAction={() => setOpenAreYouSure(false)}>
        <AreYouSure>정말로 신청하시겠습니까? <br /> 기상곡을 신청하면 삭제할 수 없습니다.</AreYouSure>
        <MusicCard style={{margin: "0 12px"}}>
          <img src={target && target.snippet.thumbnails.high.url} alt=""/>
          <div className="details">
            <p className="title">{target && target.snippet.title.substring(0, 20)}{target && target.snippet.title.length > 20}...</p>
            <p className="author">{target && target.snippet.channelTitle}</p>
          </div>
        </MusicCard>
        <Button type={"danger"} style={{margin: "12px"}} width={"calc(100% - 24px)"} onClick={() => {apply((target && target.id.videoId) || "");setOpenAreYouSure(false);}}>신청하기</Button>
      </SelectionDialog>
    </>
  );
}

export default ApplySection;