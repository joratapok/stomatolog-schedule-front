import React from 'react';
import {Button, ButtonProps} from '@mui/material';
import {TypoLink} from '@box/shared/ui/TypeLink';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = {
  onClick: () => void;
  size?: 'small' | 'medium';
  isUpArrow: boolean;
  title: string;
};

export const OpenArrowButton: React.FC<Props & ButtonProps> = ({
  onClick,
  size,
  isUpArrow,
  title,
  ...props
}) => {
  return (
    <Button color="primary" onClick={onClick} {...props}>
      <TypoLink bold variant={size === 'medium' ? 'h5' : 'h6'} align={'left'}>
        {title}
      </TypoLink>
      {isUpArrow ? (
        <KeyboardArrowDownIcon color={'primary'} />
      ) : (
        <KeyboardArrowUpIcon color={'primary'} />
      )}
    </Button>
  );
};
