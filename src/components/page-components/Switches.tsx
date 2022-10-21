import ConnectForm from "./ConnectForm";
interface Iselect {
  required?: boolean;
  className?: string;
  requiredMessage?: string;
  defaultChecked: boolean;
  onChange?: any;
  pattern?: any;
  name: string;
  register?: any;
  errors?: any;
}

const Select = ({
  register,
  name,
  className,
  defaultChecked,
  required,
  onChange,
  errors,
  ...rest
}: Iselect) => {

  const handleChange = (e: any) => {
    onChange && onChange(name, e.target.checked);
  };

  return (
    <ConnectForm>
      {({ register }: any) => {
        return (
          <label className="switch">
            <input
              type="checkbox"
              name={name}
              id={name}
              onClick={handleChange}
              defaultChecked={defaultChecked}
              {...register(name)}
              {...rest}
            />
            <span className="slider round"></span>
          </label>
        );
      }}
    </ConnectForm>
  );
};
export default Select;
