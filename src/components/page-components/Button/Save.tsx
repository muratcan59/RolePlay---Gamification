import { useState, useEffect } from 'react';
import M from "../../../helpers/translate";

interface Props {
  text?: string;
  onClick?: () => void;
}

function ButtonSave(props: Props) {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (props?.text === undefined) {
      M.T("KAYDET", "").then(setValue);
    }
    else {
      setValue(props?.text)
    }
  }, [props.text]);

  return (
    <input type={props?.onClick ? "button" : "submit"} value={value} disabled={disabled} onClick={async () => {
      if (disabled || props.onClick === undefined) return;
      setDisabled(true);
      await props.onClick();
      setDisabled(false);
    }} className="BY" />
  );
}

export default ButtonSave;