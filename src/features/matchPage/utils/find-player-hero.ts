import {
  FacetGradientColors,
  Hero,
  Player,
  PlayerColors,
  PlayerHero,
} from '@/features/matchPage/types';

export function findPlayerHero(player: Player, heroes: Hero[], heroAbilities: unknown): PlayerHero {
  const playerHero = {
    name: '',
    localizedName: '',
    heroFacet: {
      icon: '',
      color: '',
      colorSingle: '',
      title: '',
      description: '',
    },
    playerColor: '',
  };

  findColor(player, playerHero);

  const currentHero = findHeroName(player, heroes, playerHero);

  findHeroFacet(player, heroAbilities, currentHero, playerHero);

  return playerHero;
}

function findColor(player: Player, playerHero: PlayerHero): void {
  const playerColors: PlayerColors = {
    radiant: {
      teamNumber: 0,
      colors: {
        '0': '#3375ff',
        '1': '#66ffbf',
        '2': '#bf00bf',
        '3': '#f3f00b',
        '4': '#ff6b00',
      },
    },

    dire: {
      teamNumber: 1,
      colors: {
        '0': '#fe86c2',
        '1': '#a1b447',
        '2': '#65d9f7',
        '3': '#008321',
        '4': '#a46900',
      },
    },
  };

  if (player.team_number === playerColors.radiant.teamNumber) {
    for (const [colorKey, colorValue] of Object.entries(playerColors.radiant.colors)) {
      if (player.player_slot.toString() === colorKey) {
        playerHero.playerColor = colorValue;
      }
    }
  }

  if (player.team_number === playerColors.dire.teamNumber) {
    for (const [colorKey, colorValue] of Object.entries(playerColors.dire.colors)) {
      if (player.team_slot.toString() === colorKey) {
        playerHero.playerColor = colorValue;
      }
    }
  }
}

function findHeroName(player: Player, heroList: Hero[], playerHero: PlayerHero): string {
  let currentHero = '';

  for (let i = 0; i < heroList.length; ++i) {
    const hero = heroList[i];

    if (player.hero_id === hero.id) {
      playerHero.name = hero.name;
      playerHero.name = playerHero.name.replace('npc_dota_hero_', '');
      playerHero.localizedName = hero.localized_name;
      currentHero = hero.name;
    }
  }

  return currentHero;
}

function findHeroFacet(
  player: Player,
  heroAbilities: unknown,
  currentHero: string,
  playerHero: PlayerHero
): void {
  if (heroAbilities) {
    for (const [heroID, value] of Object.entries(heroAbilities)) {
      if (currentHero === heroID) {
        switch (player.hero_variant) {
          case 1:
            setHeroFacet(value, 0, playerHero);
            break;

          case 2:
            setHeroFacet(value, 1, playerHero);
            break;

          case 3:
            setHeroFacet(value, 2, playerHero);
            break;

          case 4:
            setHeroFacet(value, 3, playerHero);
            break;

          case 5:
            setHeroFacet(value, 4, playerHero);
            break;

          default:
            break;
        }
      }
    }
  }
}

function setHeroFacet(value: unknown, facetID: number, playerHero: PlayerHero): void {
  const facetGradientColor: FacetGradientColors = {
    colorRed0Single: '#4A2040',
    colorRed1Single: '#452732',
    colorRed2Single: '#4F2A25',
    colorRed0: 'linear-gradient(to right, #9F3C3C, #4A2040)',
    colorRed1: 'linear-gradient(to right, #954533, #452732)',
    colorRed2: 'linear-gradient(to right, #A3735E, #4F2A25)',

    colorYellow0Single: '#6F3D21',
    colorYellow1Single: '#604928',
    colorYellow2Single: '#433828',
    colorYellow3Single: '#4D352B',
    colorYellow0: 'linear-gradient(to right, #C8A45C, #6F3D21)',
    colorYellow1: 'linear-gradient(to right, #C6A158, #604928)',
    colorYellow2: 'linear-gradient(to right, #CAC194, #433828)',
    colorYellow3: 'linear-gradient(to right, #C3A99A, #4D352B)',

    colorPurple0Single: '#412755',
    colorPurple1Single: '#282752',
    colorPurple2Single: '#261C44',
    colorPurple0: 'linear-gradient(to right, #B57789, #412755)',
    colorPurple1: 'linear-gradient(to right, #9C70A4, #282752)',
    colorPurple2: 'linear-gradient(to right, #675CAE, #261C44)',

    colorBlue0Single: '#342D5B',
    colorBlue1Single: '#2A385E',
    colorBlue2Single: '#135459',
    colorBlue3Single: '#385B59',
    colorBlue0: 'linear-gradient(to right, #727CB2, #342D5B)',
    colorBlue1: 'linear-gradient(to right, #547EA6, #2A385E)',
    colorBlue2: 'linear-gradient(to right, #6BAEBC, #135459)',
    colorBlue3: 'linear-gradient(to right, #94B5BA, #385B59)',

    colorGreen0Single: '#2D5A18',
    colorGreen1Single: '#29493A',
    colorGreen2Single: '#2D5A18',
    colorGreen3Single: '#223824',
    colorGreen4Single: '#3F4129',
    colorGreen0: 'linear-gradient(to right, #A2B23E, #2D5A18)',
    colorGreen1: 'linear-gradient(to right, #7EC2B2, #29493A)',
    colorGreen2: 'linear-gradient(to right, #A2B23E, #2D5A18)',
    colorGreen3: 'linear-gradient(to right, #9A9F6A, #223824)',
    colorGreen4: 'linear-gradient(to right, #9FAD8E, #3F4129)',

    colorGray0Single: '#1B1B21',
    colorGray1Single: '#29272C',
    colorGray2Single: '#3E464F',
    colorGray3Single: '#4E5557',
    colorGray0: 'linear-gradient(to right, #565C61, #1B1B21)',
    colorGray1: 'linear-gradient(to right, #6A6D73, #29272C)',
    colorGray2: 'linear-gradient(to right, #95A9B1, #3E464F)',
    colorGray3: 'linear-gradient(to right, #ADB6BE, #4E5557)',
  };

  // Type guard
  if (typeof value !== 'object' || !value || !('facets' in value) || !Array.isArray(value.facets)) {
    return;
  }

  if (value.facets[facetID]) {
    playerHero.heroFacet.icon = value.facets[facetID].icon;

    const highLevelColor: string = value.facets[facetID].color;
    const gradientId: number = value.facets[facetID].gradient_id;
    playerHero.heroFacet.color = facetGradientColor[`color${highLevelColor}${gradientId}`];
    playerHero.heroFacet.colorSingle =
      facetGradientColor[`color${highLevelColor}${gradientId}Single`];

    playerHero.heroFacet.title = value.facets[facetID].title;
    playerHero.heroFacet.description = value.facets[facetID].description;
  }
}
