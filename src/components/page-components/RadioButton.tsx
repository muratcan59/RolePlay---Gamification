import React from "react";
import * as CSS from 'csstype';
import ConnectForm from "./ConnectForm";
interface IRadioButton {
  name: string;
  checked?: boolean;
  isStorybook?: boolean;
  label?: string;
  value?: string;
  style?: CSS.Properties<string | number>;
  onChange?: any;
  register?: any;
  defaultChecked?: boolean;
}
const RadioButton = React.forwardRef(
  (
    { name, onChange, defaultChecked, register, label, value, style, ...rest }: IRadioButton,
    forwardedRef: any
  ) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
      if (onChange) {
        onChange(checked);
      }
    }, [checked]);

    return (
      <ConnectForm>
        {({ register }: any) => {
          return (
            <>
              <input
                ref={forwardedRef}
                type="radio"
                id={label && name}
                name={name}
                value={value}
                style={style}
                {...register(name)}
                {...rest}
                checked={checked}
              />
              {label && <label htmlFor={name}>{label}</label>}
            </>
          );
        }}
      </ConnectForm>
    );
  }
);

export default RadioButton;