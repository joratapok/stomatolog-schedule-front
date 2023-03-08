import {FC} from 'react';
import {alpha} from '@mui/system';
import {Box} from '@mui/material';
import {TypoContent} from '@box/shared/ui';

type Props = {
  toothNumber: string;
  isActive?: boolean;
  pressHandler: (toothNumber: string) => void;
  isSelected: boolean;
};

export const ToothBox: FC<Props> = ({
  toothNumber,
  isActive,
  pressHandler,
  isSelected,
}) => {
  return (
    <Box
      onClick={() => pressHandler(toothNumber)}
      sx={(theme) => ({
        padding: 1,
        mr: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 1,
        cursor: 'pointer',
        bgcolor: isSelected
          ? theme.palette.primary.main
          : isActive
          ? alpha(theme.palette.primary.main, 0.3)
          : 'transparent',
      })}
    >
      <TypoContent>{toothNumber}</TypoContent>
    </Box>
  );
};
