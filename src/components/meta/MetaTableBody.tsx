import { Image } from '@/shared/nextjs-imports';

export default function MetaTableBody({
  heroName,
  heroLocalizedName,
  winrate,
  pick,
}: {
  heroName: string;
  heroLocalizedName: string;
  winrate: number;
  pick: number;
}) {
  return (
    <tr>
      <td>
        <div
          style={{
            padding: '0px 15px 0px 0px',
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.3rem',
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL as string}${heroName.replace('npc_dota_hero_', '')}.png`}
            alt={heroName}
            width={54}
            height={30}
          />
          {heroLocalizedName}
        </div>
      </td>
      <td>
        <div
          style={{
            width: 'max-content',
            margin: '0 auto',
            padding: '0px 15px',
            color: winrate >= 50 ? '#59ce8f' : '#df2e38',
          }}
        >
          {winrate.toFixed(2)}%
        </div>
      </td>
      <td>
        <div
          style={{
            padding: '0px 15px',
            width: 'max-content',
            margin: '0 auto',
          }}
        >
          {pick}
        </div>
      </td>
    </tr>
  );
}
