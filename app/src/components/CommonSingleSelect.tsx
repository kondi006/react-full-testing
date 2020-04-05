import React, { ChangeEvent, FC } from 'react';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';

interface CommonSingleSelectProps {
  label?: string;
  className?: string;
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  disabled?: boolean;
  onChange?: () => void;
}

export const CommonSingleSelect: FC<CommonSingleSelectProps> = (props: CommonSingleSelectProps) => {
  const handleOnChange = (event: ChangeEvent<{}>, value: any): void => {
    props.setSelectedValue(value);
    if (props.onChange) {
      props.onChange();
    }
  };

  const getTextInputVariant = (): string => {
    return !!props.label ? 'filled' : 'outlined';
  };

  const isDisabled = (): boolean => {
    return Boolean(props.disabled) || (!!props.options && props.options.length === 0);
  };

  return (
    <AutoComplete
      className={props.className}
      options={props.options}
      value={props.selectedValue ?? ''}
      onChange={handleOnChange}
      disabled={isDisabled()}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={props.label}
          variant={getTextInputVariant()}
          fullWidth
        />
      )}
    />
  );
};
