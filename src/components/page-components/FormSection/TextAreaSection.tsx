interface ITextarea {
  title: string;
  rows?:string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxlength: number;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  register?: any;
}

const Textarea = ({
  register,
  rows,
  name,
  title,
  description,
  className,
  maxlength,
  placeholder,
  required,
  ...rest
}: ITextarea) => {
  return (
    <div>
      <div className="title">{title}<span className="Z">*</span></div>
      <div className="control">
        <textarea 
          type="text"
          rows ={rows? rows:"1"}
          className={className ? className : "normal"}
          placeholder={placeholder}
          required={required}
          {...register(name, {required: "Bu alan zorunlu", maxLength: maxlength })}
          {...rest}
        />
      </div>
      {description && <div className="description">{description}</div>}
    </div>
  );
};
export default Textarea;
