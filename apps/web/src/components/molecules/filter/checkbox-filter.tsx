import { CheckboxInput } from 'components/atoms';
import { AccordionSection } from 'components/molecules/section';
import { ChangeEvent, FC, ReactNode } from 'react';

type CheckboxOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
export interface CheckboxFilterProps {
  heading?: string;
  loading?: boolean;
  onChange?: (key: string, value: string[]) => void;
  name: string;
  options: Array<CheckboxOption>;
  values: Array<string>;
  action?: ReactNode;
}

export const CheckboxFilter: FC<CheckboxFilterProps> = ({
  heading,
  name,
  loading = false,
  options,
  values = [],
  onChange,
  action,
}) => {
  const onSelect = (event: ChangeEvent<HTMLInputElement>, option: CheckboxOption) => {
    const checked = event.target.checked;
    if (checked) {
      onChange(name, [...values, option.value]);
    } else {
      onChange(
        name,
        values.filter((value) => value !== option.value),
      );
    }
  };

  return (
    <AccordionSection heading={heading} className="py-5 pb-3" contentClassName="pb-0">
      {action && <div className="mb-6 w-full">{action}</div>}
      {!loading ? (
        options.map((option) => (
          <CheckboxInput
            key={option.value}
            label={option.label}
            checked={values.includes(option.value)}
            name={name}
            className="mb-5"
            disabled={option.disabled}
            onChange={(event) => onSelect(event, option)}
          />
        ))
      ) : (
        <div>loading...</div>
      )}
    </AccordionSection>
  );
};
