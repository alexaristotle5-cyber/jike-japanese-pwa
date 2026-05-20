export type RewardVideo = {
  id: string;
  title: string;
  src: string;
};

export const rewardVideos: RewardVideo[] = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;
  const id = `reward-${String(number).padStart(3, "0")}`;

  return {
    id,
    title: `视频奖励 ${String(number).padStart(2, "0")}`,
    src: `assets/videos/rewards/${id}.mp4`,
  };
});
