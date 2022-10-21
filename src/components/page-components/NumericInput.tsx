import ConnectForm from "./ConnectForm";
import { ErrorMessage } from '@hookform/error-message';

interface Inumaricinput {
  defaultValue?: number;
  className?: string;
  min?: number;
  max?: number;
  requiredMessage?: string;
  maxLengthMessage?: string;
  minLengthMessage?: string;
  pattern?: any;
  name: string;
  name2?: string;
  register?: any;
  allowDecimalNumber?: boolean;
  onChange?: any;
  required?: boolean;
}

const NumericInput = ({
  register,
  name,
  name2,
  className,
  min,
  max,
  defaultValue,
  allowDecimalNumber,
  requiredMessage,
  maxLengthMessage,
  minLengthMessage,
  onChange,
  required,
  ...rest
}: Inumaricinput) => {
  let width = max ? Math.max(25, Math.min(max.toString().length * 18, 80)) : 25;
  return (
    <ConnectForm>
      {({ register }: any) => {
        return (<>
          <input
            type="number"
            min={min}
            max={max}
            style={{ maxWidth: width + "px" }}
            onInput={onChange}
            required={required}
            {...register(name, {
              maxLength: 40,
              min: { value: min, message: minLengthMessage },
              max: { value: max, message: maxLengthMessage },
            })}
            {...rest}
            defaultValue={defaultValue}
          />
          {allowDecimalNumber && (
            <>
              <b>,</b>
              <input
                type="number"
                required={required}
                {...register(name2, { maxLength: 2, min: 0, max: 99, requiredMessage: requiredMessage })}
                {...rest}
                defaultValue={0}
              />
            </>
          )}
          <ErrorMessage
            name={name}
            render={({ message }) =>
              <div className="VALIDATOR"><span className="ERROR" style={{ display: "inline-list-item" }}>{message}</span></div>
            }
          />
        </>)
      }}
    </ConnectForm>
  );
};
export default NumericInput;
