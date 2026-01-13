import { type Player, type PlayerDetails, PlayerProfile } from '@/features/matchPage/types';

/**
 * Returns details about player
 *
 * @param player Player
 * @param playerProfiles Player profiles
 * @returns {PlayerDetails}
 */
export function findPlayerDetails(
  player: Player,
  playerProfiles: PlayerProfile[] | null
): PlayerDetails {
  const playerDetails: PlayerDetails = {
    profileInfo: {
      avatar: '',
      rankIcon: '',
      profileUrl: '',
    },
    rankTier: null,
    leaderboardRank: null,
  };

  if (!playerProfiles) {
    return playerDetails;
  }

  if ('account_id' in player) {
    for (const playerProfile of playerProfiles) {
      if ('profile' in playerProfile) {
        if (player.account_id === playerProfile.profile.account_id) {
          // avatar
          playerDetails.profileInfo.avatar = playerProfile.profile.avatar;

          // profile url
          playerDetails.profileInfo.profileUrl = playerProfile.profile.profileurl;

          // rank tier
          playerDetails.rankTier = playerProfile.rank_tier;

          // rank
          playerDetails.leaderboardRank = playerProfile.leaderboard_rank;

          // rank icon
          playerDetails.profileInfo.rankIcon = findPlayerRankIcon(playerDetails);

          break;
        }
      }
    }
  }

  return playerDetails;
}

function findPlayerRankIcon(playerDetails: PlayerDetails): string {
  const imagePath = '/images/ranks/';

  const { leaderboardRank, rankTier } = playerDetails;

  if (rankTier && leaderboardRank) {
    if (leaderboardRank <= 10 && leaderboardRank >= 1) {
      return `${imagePath}${rankTier + 2}.png`;
    }

    if (leaderboardRank > 10 && leaderboardRank <= 100) {
      return `${imagePath}${rankTier + 1}.png`;
    }

    if (leaderboardRank > 100) {
      return `${imagePath}${rankTier}.png`;
    }
  }

  if (rankTier && !leaderboardRank) {
    return `${imagePath}${rankTier}.png`;
  }

  return `${imagePath}00.png`;
}
