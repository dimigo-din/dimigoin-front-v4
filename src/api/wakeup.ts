import {getInstance} from "./client.ts";

const client = getInstance();

export type YoutubeItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

export type YoutubeSearchResult = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeItem[];
}

export type WakeupApplication = {
  id: string;
  video_id: string;
  video_title: string;
  video_thumbnail: string;
  video_channel: string;
  week: string;
}

export type WakeupApplicationWithVote = {
  up: number;
  down: number;
} & WakeupApplication;

export type WakeupApplicationVotes = {
  id: string;
  upvote: boolean;
  wakeupSongApplication: WakeupApplication;
}

export type WakeupHistory = {
  id: string;
  video_id: string;
  video_title: string;
  date: string;
  gender: "male" | "female";
  up: number;
  down: number;
}

export async function searchMusic(query: string): Promise<YoutubeSearchResult> {
  return (await client.get("/student/wakeup/search?query="+query)).data;
}

export async function getWakeupApplications(): Promise<WakeupApplicationWithVote[]> {
  return (await client.get("/student/wakeup")).data;
}

export async function applyWakeupSong(videoId: string): Promise<WakeupApplication> {
  return (await client.post("/student/wakeup", { videoId: videoId })).data;
}

export async function getMyWakeupApplicationVotes(): Promise<WakeupApplicationVotes[]> {
  return (await client.get("/student/wakeup/vote")).data;
}

export async function voteWakeupApplication(songId: string, upvote: boolean): Promise<WakeupApplicationVotes> {
  return (await client.post("/student/wakeup/vote", { songId: songId, upvote: upvote })).data;
}

export async function unVoteWakeupApplication(application_id: string) {
  return (await client.delete("/student/wakeup/vote?id="+application_id)).data;
}

export async function getWakeUpHistory(gender: "male" | "female"): Promise<WakeupHistory> {
  return (await client.get("/wakeup/history?date=" + new Date().toISOString().split("T")[0] + "&gender=" + gender)).data;
}