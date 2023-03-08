import React, {FC} from 'react';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import {IconButton, Tooltip, Typography} from '@mui/material';
import {ICabinet} from '@box/shared/models';
import {NoBorderCell} from '@box/shared/ui';

type Props = {
  cabinet: ICabinet;
  createDuty: (cabinet: ICabinet) => void;
  width: string;
};

export const CabinetHeaderCell: FC<Props> = ({cabinet, width, createDuty}) => {
  return (
    <NoBorderCell sx={{width}} align="center">
      <Typography variant={'h5'}>{cabinet.name}</Typography>
      <Tooltip placement={'right'} title="Редактировать смены">
        <IconButton
          onClick={() => createDuty(cabinet)}
          color="primary"
          aria-label="add duty"
        >
          <MoreTimeIcon />
        </IconButton>
      </Tooltip>
    </NoBorderCell>
  );
};
