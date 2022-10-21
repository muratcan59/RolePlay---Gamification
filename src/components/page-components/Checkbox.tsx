import React from "react";
import "../../shared/translate";
import ConnectForm from "./ConnectForm";
interface ICheckbox {
  name: string;
  checked: boolean;
  isStorybook?: boolean;
  value?: string;
  onChange?: any;
  register?: any;
  defaultChecked: boolean;
}
const Checkbox = React.forwardRef(
  (
    { name, onChange, defaultChecked,register,value, ...rest }: ICheckbox,
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
            <div
              onClick={() => setChecked(!checked)}
              style={{ cursor: "pointer", paddingTop: "2px" }}
            >
              <input
                ref={forwardedRef}
                type="checkbox"
                name={name}
                value={value}
                {...register(name)}
                {...rest}
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
            </div>
          );
        }}
      </ConnectForm>
    );
  }
);

export default Checkbox;
