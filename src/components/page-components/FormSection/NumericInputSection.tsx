import ConnectForm from "../ConnectForm";
interface Inumaricinput {
  title: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  register?: any;
  allowDecimalNumber?: boolean;
}

const NumericInput = ({
  register,
  name,
  title,
  description,
  className,
  min,
  max,
  placeholder,
  required,
  allowDecimalNumber,
  ...rest
}: Inumaricinput) => {
  // const [num1, setNum1] = useState("");
  // const [num2, setNum2] = useState("");
  // const [total, setTotal] = useState(1.0);
  // const totalRef = useRef(0.0);

  // useEffect(()=>{
  //   var total = num1 + "." + num2;
  //   totalRef.current = parseFloat(total);
  //   setTotal(parseFloat(total));
  // })

  return (
    <ConnectForm>
      {({ register }: any) => (
        <div>
          <div className="title">
            {title}
            <span className="Z">*</span>
          </div>
          <div className="control">
            <input type="hidden" {...register(name)}
            // value={totalRef.current}
            // ref={totalRef}
              />
            <input
              type="number"
              className={className ? className : "a"}
              placeholder={placeholder}
              required={required}
              {...register("num1", {
                maxLength: max === undefined ? 10 : max.toString().length,
                min: min,
                max: max,
              })}
              {...rest}
              defaultValue={0}
              // onChange={event => setNum1(event.target.value)}
            />
            {allowDecimalNumber && (
              <>
                <b>,</b>
                <input
                  type="number"
                  className={className ? className : "a"}
                  placeholder={placeholder}
                  required={required}
                  {...register("num2", { maxLength: 2, min: 0, max: 99 })}
                  {...rest}
                  defaultValue={0}
                  // onChange={event => setNum2(event.target.value)}
                />
              </>
            )}
          </div>
          {description && <div className="description">{description}</div>}
        </div>
      )}
    </ConnectForm>
  );
};
export default NumericInput;
