import ConnectForm from "../ConnectForm";
interface Iselect {
  title: string;
  description?: string;
  required?: boolean;
  className?: string;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  register?: any;
  errors?:any;
  options: Array<string>;
}

const Select = ({
  register,
  name,
  title,
  className,
  description,
  required,
  options,
  errors,
  ...rest
}: Iselect) => {
 
  return (
    <ConnectForm>
       {({ register }: any) => {
            return (
    <div>
      <div className="title">
        {title}
        {required &&
          <span className="Z">*</span>
        }
      
      </div>
      <div className="control">
        <select
          required={required}
          {...register(name,{required:"Bu alan zorunlu"})}
          className={className ? className : "normal"}
          {...rest} 
        >
          <option value={"null"}>Seçiniz</option>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      {description && <div className="description">{description}</div>}
    </div>
    );
      }}
    </ConnectForm>
  );
};
export default Select;
