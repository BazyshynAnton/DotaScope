import ItemDescription from './ItemDescription';

import { Image } from '@/shared/nextjs-imports';
import { useState } from '@/shared/react-imports';

import { PlayerRowUtility } from '@/utils/statistic/player-row-utility';

import type { Player } from '@/types/statistic/match-data';

// Initial State for useState in Aghanim component.
const initialStateAghanim = {
  0: false,
  1: false,
};

export default function Aghanim({ player }: { player: Player }) {
  //
  // State for manage tooltip about aghanim.
  const [toolTipStatus, setToolTipStatus] = useState(initialStateAghanim);

  // Initialize utility for manage data in component
  const prrUtility = PlayerRowUtility.getInstance();

  // Function to update the toolTipStatus when mouse enter
  const handleMouseEnterAghanim = (idx: number) => {
    prrUtility.handleMouseEnter('ultimate_scepter', 'aghanim_slot', idx, setToolTipStatus);
  };

  // Function to update the toolTipStatus when mouse leave
  const handleMouseLeaveAghanim = (idx: number) => {
    prrUtility.handleMouseLeave('aghanim_slot', idx, setToolTipStatus);
  };

  // Get details about Current Aghanim Item
  const details = (item: string) => prrUtility.findDetailsAboutCurrentItem('aghanim', item);

  // Condition
  const toolTipCondition = toolTipStatus[0] ? 'ultimate_scepter' : 'aghanims_shard';

  return (
    <>
      {(toolTipStatus[0] || toolTipStatus[1]) && (
        <ItemDescription details={details(toolTipCondition)} item={toolTipCondition} />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.1rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={`/pictures/dota-item-icons/${
            player.aghanims_scepter === 1 ? 'scepter-1' : 'scepter-0'
          }.png`}
          alt={player.aghanims_scepter === 1 ? 'scepter-1' : 'scepter-0'}
          width={37}
          height={38}
          onMouseEnter={() => handleMouseEnterAghanim(0)}
          onMouseLeave={() => handleMouseLeaveAghanim(0)}
          style={{ cursor: 'help' }}
        />
        <Image
          src={`/pictures/dota-item-icons/${player.aghanims_shard === 1 ? 'shard-1' : 'shard-0'}.png`}
          alt={player.aghanims_shard === 1 ? 'shard-1' : 'shard-0'}
          width={45}
          height={24}
          onMouseEnter={() => handleMouseEnterAghanim(1)}
          onMouseLeave={() => handleMouseLeaveAghanim(1)}
          style={{ cursor: 'help' }}
        />
      </div>
    </>
  );
}
