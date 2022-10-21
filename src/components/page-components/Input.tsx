import "../../shared/translate";
import ConnectForm from "./ConnectForm";
interface Iinput {
  required?: boolean;
  errors?: any;
  placeholder?: string;
  className?: string;
  maxlength?: number;
  requiredMessage?: string;
  // pattern?: any;
  name: string;
  register?: any;
  requiredMsg?: string;
  isStorybook?: boolean;
  defaultValue?: string;
  onChange?:any;
}

const Input = ({
  register,
  name,
  className,
  maxlength,
  placeholder,
  required,
  errors,
  requiredMsg,
  isStorybook,
  defaultValue,
  onChange,
  ...rest
}: Iinput) => {
  return (
    <ConnectForm>
      {({ register }: any) => {
        return <input
          type="text"
          className={className ? className : "normal"}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          onInput={onChange}
          {...register(name, { maxLength: maxlength })}
          {...rest}
        />
      }}
    </ConnectForm>
  );
};
export default Input;