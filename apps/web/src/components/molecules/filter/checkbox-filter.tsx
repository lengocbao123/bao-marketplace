import { ChangeEvent, FC, ReactNode } from 'react';
import { CheckboxInput } from '../../atoms';
import { AccordionSection } from '../section';

type CheckboxOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
export interface CheckboxFilterProps {
  heading?: string;
  onChange?: (key: string, value: string[]) => void;
  name: string;
  options: Array<CheckboxOption>;
  values: Array<string>;
  action?: ReactNode;
}

export const CheckboxFilter: FC<CheckboxFilterProps> = ({ heading, name, options, values, onChange, action }) => {
  const onSelect = (event: ChangeEvent<HTMLInputElement>, option: CheckboxOption) => {
    const checked = event.target.checked;
    if (checked) {
      onChange(name, [...values, option.value]);
    } else {
      onChange(
        name,
        values.filter((value) => value !== option.value)
      );
    }
  };
  return (
    <AccordionSection heading={heading}>
      {action && <div className="mb-6">{action}</div>}
      {options.map((option) => (
        <CheckboxInput
          key={option.value.toString()}
          label={option.label}
          name={name}
          className="mb-5"
          disabled={option.disabled}
          onChange={(event) => onSelect(event, option)}
        />
      ))}
    </AccordionSection>
  );
};
