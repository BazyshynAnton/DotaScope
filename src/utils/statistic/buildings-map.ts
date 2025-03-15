import type { LanePositions, PlayerLane } from '@/types/statistic/buildings-map';
import type { HeroList, Objectives, Player } from '@/types/statistic/match-data';

export const findKilledBuildings = (objectives: Objectives[] | undefined): Objectives[] | null => {
  if (!objectives) return null;

  return objectives.filter((obj) => obj.type === 'building_kill');
};

export const findPlayerLanes = (players: Player[], heroList: HeroList[]) => {
  const playerLanes: PlayerLane[] = [];

  players.forEach((p1) => {
    if (playerLanes.length !== 0) {
      const isAlreadyPacked = playerLanes.some(
        (pl) =>
          pl.firstHero.key === p1.account_id ||
          (pl.secondHero && pl.secondHero.key === p1.account_id)
      );

      if (isAlreadyPacked) return; // go to the next iteration
    }

    if (!p1.lane || !p1.lane_role) return null;

    let hero = heroList.find((h) => h.id === p1.hero_id);

    const playerLane: PlayerLane = {
      firstHero: {
        iconUrl:
          (process.env.NEXT_PUBLIC_HERO_SMALL_ICON_URL as string) +
          hero?.name.replace('npc_dota_hero_', '') +
          '.png',
        key: p1.account_id,
      },
      secondHero: null,
      isRadiant: p1.isRadiant,
      laneRole: p1.lane_role,
      position: lanePositions[p1.lane_role][p1.isRadiant ? 'radiant' : 'dire'],
    };

    let player2: Player | undefined = undefined;
    if (p1.lane_role !== 2) {
      player2 = players.find(
        (p2) =>
          p1.hero_id !== p2.hero_id &&
          p1.isRadiant === p2.isRadiant &&
          p1.lane_role === p2.lane_role
      );
    }

    if (player2) {
      hero = heroList.find((h) => h.id === player2.hero_id);

      playerLane.secondHero = {
        iconUrl:
          (process.env.NEXT_PUBLIC_HERO_SMALL_ICON_URL as string) +
          hero?.name.replace('npc_dota_hero_', '') +
          '.png',
        key: player2.account_id,
      };
    }

    playerLanes.push(playerLane);
  });

  return playerLanes;
};

const lanePositions: LanePositions = {
  '1': {
    radiant: {
      offsetTop: 305,
      offsetLeft: 250,
    },
    dire: {
      offsetTop: 20,
      offsetLeft: 40,
    },
  },
  '2': {
    radiant: {
      offsetTop: 187,
      offsetLeft: 153,
    },
    dire: {
      offsetTop: 153,
      offsetLeft: 143,
    },
  },
  '3': {
    radiant: {
      offsetTop: 120,
      offsetLeft: 8,
    },
    dire: {
      offsetTop: 170,
      offsetLeft: 310,
    },
  },
};

export const buildings = [
  {
    offsetTop: 280,
    offsetLeft: 33,
    url: process.env.NEXT_PUBLIC_GOODGUYS_FORT as string,
    width: 25,
    height: 25,
    key: 'npc_dota_goodguys_fort',
  },
  {
    offsetTop: 268,
    offsetLeft: 43,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower4',
  },
  {
    offsetTop: 280,
    offsetLeft: 53,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower4',
  },
  {
    offsetTop: 293,
    offsetLeft: 85,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower3_bot',
  },
  {
    offsetTop: 297,
    offsetLeft: 160,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower2_bot',
  },
  {
    offsetTop: 290,
    offsetLeft: 273,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower1_bot',
  },
  {
    offsetTop: 238,
    offsetLeft: 30,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower3_top',
  },
  {
    offsetTop: 185,
    offsetLeft: 33,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower2_top',
  },
  {
    offsetTop: 126,
    offsetLeft: 35,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower1_top',
  },
  {
    offsetTop: 245,
    offsetLeft: 38,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_melee_rax_top',
  },
  {
    offsetTop: 245,
    offsetLeft: 25,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_range_rax_top',
  },
  {
    offsetTop: 285,
    offsetLeft: 76,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_range_rax_bot',
  },
  {
    offsetTop: 297,
    offsetLeft: 76,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_melee_rax_bot',
  },
  {
    offsetTop: 252,
    offsetLeft: 70,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower3_mid',
  },
  {
    offsetTop: 224,
    offsetLeft: 100,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower2_mid',
  },
  {
    offsetTop: 190,
    offsetLeft: 140,
    url: process.env.NEXT_PUBLIC_GOODGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_goodguys_tower1_mid',
  },
  {
    offsetTop: 262,
    offsetLeft: 70,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX_ANGLE as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_melee_rax_mid',
  },
  {
    offsetTop: 252,
    offsetLeft: 60,
    url: process.env.NEXT_PUBLIC_GOODGUYS_RAX_ANGLE as string,
    width: 12,
    height: 12,
    key: 'npc_dota_goodguys_range_rax_mid',
  },
  {
    offsetTop: 45,
    offsetLeft: 290,
    url: process.env.NEXT_PUBLIC_BADGUYS_FORT as string,
    width: 25,
    height: 25,
    key: 'npc_dota_badguys_fort',
  },
  {
    offsetTop: 63,
    offsetLeft: 290,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower4',
  },
  {
    offsetTop: 52,
    offsetLeft: 280,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower4',
  },
  {
    offsetTop: 103,
    offsetLeft: 301,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower3_bot',
  },
  {
    offsetTop: 160,
    offsetLeft: 296,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower2_bot',
  },
  {
    offsetTop: 213,
    offsetLeft: 294,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower1_bot',
  },
  {
    offsetTop: 46,
    offsetLeft: 244,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower3_top',
  },
  {
    offsetTop: 43,
    offsetLeft: 173,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower2_top',
  },
  {
    offsetTop: 45,
    offsetLeft: 60,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower1_top',
  },
  {
    offsetTop: 90,
    offsetLeft: 295,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_range_rax_bot',
  },
  {
    offsetTop: 90,
    offsetLeft: 309,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_melee_rax_bot',
  },
  {
    offsetTop: 38,
    offsetLeft: 255,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_range_rax_top',
  },
  {
    offsetTop: 50,
    offsetLeft: 255,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_melee_rax_top',
  },
  {
    offsetTop: 87,
    offsetLeft: 256,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower3_mid',
  },
  {
    offsetTop: 120,
    offsetLeft: 223,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower2_mid',
  },
  {
    offsetTop: 160,
    offsetLeft: 173,
    url: process.env.NEXT_PUBLIC_BADGUYS_TOWER_ANGLE as string,
    width: 16,
    height: 16,
    key: 'npc_dota_badguys_tower1_mid',
  },
  {
    offsetTop: 72,
    offsetLeft: 259,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX_ANGLE as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_melee_rax_mid',
  },
  {
    offsetTop: 82,
    offsetLeft: 270,
    url: process.env.NEXT_PUBLIC_BADGUYS_RAX_ANGLE as string,
    width: 12,
    height: 12,
    key: 'npc_dota_badguys_range_rax_mid',
  },
];
