import ConnectForm from "./ConnectForm";
interface Iselect {
  required?: boolean;
  className?: string;
  requiredMessage?: string;
  defaultOption?: string;
  defaultValue?: any;
  pattern?: any;
  name: string;
  register?: any;
  onChange?: any;
  options: Array<any>;
}

const Select = ({
  register,
  name,
  className,
  required,
  options,
  defaultOption,
  defaultValue,
  onChange,
  ...rest
}: Iselect) => {

  const handleChange = (e: any) => {
    onChange && onChange(name, e.target.value);
  };

  return (
    <ConnectForm>
      {({ register }: any) => {
        return (
          <select
            required={required}
            {...register(name, { required: "Bu alan zorunlu" })}
            {...rest}
            className={className}
            value={defaultValue}
            onChange={handleChange}
          >
            {defaultOption && <option>{defaultOption}</option>}
            {options && options.map(value => (
              (value.key !== undefined) ?
                <option key={value.key} value={value.key}>
                  {value.value}
                </option>
                :
                <option key={value} value={value}>
                  {value}
                </option>
            ))}
          </select>
        );
      }}
    </ConnectForm>
  );
};
export default Select;
