import ConnectForm from "./ConnectForm";
import { ErrorMessage } from '@hookform/error-message';

interface ITextarea {
  // title: string;
  rows?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxlength?: number;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  register?: any;
  defaultValue?: string;
  onChange?: any
}

const Textarea = ({
  register,
  rows,
  name,
  className,
  maxlength,
  placeholder,
  required,
  defaultValue,
  onChange,
  ...rest
}: ITextarea) => {
  return (
    <ConnectForm>
      {({ register }: any) => {
        return (<>
          <textarea
            name={name}
            type="text"
            rows={rows ? rows : "1"}
            className={className ? className : "normal"}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onInput={onChange}
            {...register(name, { maxLength: maxlength })}
            {...rest}
          />
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
export default Textarea;
