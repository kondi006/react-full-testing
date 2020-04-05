import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { Button } from '@material-ui/core';

export interface CommonButtonProps {
  type: 'submit' | 'reset' | 'button';
  variant?: 'outlined' | 'contained';
  onClick?: MouseEventHandler;
  disabled?: boolean;
  className?: string;
}

type Props = PropsWithChildren<CommonButtonProps>;

export const CommonButton: FC<Props> = (props: Props) => {
  return (
    <Button
      fullWidth
      type={props.type}
      disabled={props.disabled}
      variant={props.variant ? props.variant : 'contained'}
      className={props.className}
      onClick={props.onClick}
    >
      <>{props.children}</>
    </Button>
  );
};
