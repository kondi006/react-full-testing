import React, { ChangeEvent, FC } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

export interface CommonRadioGroupProps {
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  label?: string;
  className?: string;
  size?: string;
}

export const CommonRadioGroup: FC<CommonRadioGroupProps> = (props: CommonRadioGroupProps) => {
  const handleOnChange =(event: ChangeEvent<HTMLInputElement>, value: string): void => {
    props.setSelectedValue(value);
  };

  return (
    <FormControl className={props.className}>
      {!!props.label && <FormLabel>{props.label}</FormLabel>}
      <RadioGroup
        row
        value={props.selectedValue ?? ''}
        onChange={handleOnChange}
      >
        {props.options.map(option =>
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        )}
      </RadioGroup>
    </FormControl>
  );
};
