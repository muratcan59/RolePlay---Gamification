import "../../../shared/translate";
import ConnectForm from "../ConnectForm";
interface Iinput {
  title: string;
  description?: string;
  required?: boolean;
  errors?:any;
  placeholder?: string;
  className?: string;
  maxlength: number;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  register?: any;
  requiredMsg?:string;
}

const Input = ({
  name,
  title,
  description,
  className,
  maxlength,
  placeholder,
  required,
  errors,
  requiredMsg,
  ...rest
}: Iinput) => {
  return (
    <ConnectForm>
    {({register}:any)=>
    {
      return <div>
      <div className="title">{title}<span className="Z">*</span></div>
      <div className="control">
        <input
          type="text"
          className={className ? className : "normal"}
          placeholder={placeholder}
          required={required}
          {...register(name, {maxLength: maxlength })}
          {...rest}
        />
      </div>
      {description && <div className="description">{description}</div>}
  
    </div>
    }}
    </ConnectForm>
  );
};
export default Input;
