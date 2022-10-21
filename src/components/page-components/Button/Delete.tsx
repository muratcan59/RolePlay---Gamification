import { useState, useEffect } from 'react';
import M from "../../../helpers/translate";

interface Props {
  text?: string;
  setText?: Promise<string>;
  onClick?: () => void;
}

function ButtonDelete(props: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props?.setText) {
      props.setText.then(setValue);
    }
    else if (props?.text === undefined) {
      M.T("SIL", "").then(setValue);
    }
    else {
      setValue(props?.text)
    }
  }, [props.setText, props.text]);

  return (
    <input type={props?.onClick ? "button" : "submit"} value={value} onClick={props?.onClick} className="SIL" />
  );
}

export default ButtonDelete;