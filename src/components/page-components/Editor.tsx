import axios from "axios";
import { useState } from "react";

interface IEditor {
  rows?: number;
  descriptionTop?: Array<string>;
  descriptionBottom?: Array<string>;
  linkTop?: Array<string>;
  linkBottom?: Array<string>;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxlength?: number;
  requiredMessage?: string;
  pattern?: any;
  name: string;
  value?: string;
  onChange?: any;
  register?: any;
}

const Editor = ({
  register,
  rows,
  name,
  value,
  descriptionTop,
  descriptionBottom,
  linkTop,
  linkBottom,
  className,
  maxlength,
  placeholder,
  required,
  onChange,
  ...rest
}: IEditor) => {
  const [paintVisible, setPaintVisible] = useState(false);
  const insertTag = (content: any, tag: string) => {
    try {
      var selLength = content.textLength;
      var selStart = content.selectionStart;
      var selEnd = content.selectionEnd;

      var s1 = content.value.substring(0, selStart);
      var s2 = content.value.substring(selStart, selEnd);
      var s3 = content.value.substring(selEnd, selLength);

      content.value = s1 + '[' + tag + ']' + s2 + '[/' + tag + ']' + s3;
      content.selectionStart = s1.length;
      content.selectionEnd = s1.length + 5 + s2.length + tag.length * 2;

      var caretPos = selStart === selEnd ? (selStart + tag.length + 2) : content.selectionEnd;

      content.focus();
      content.setSelectionRange(caretPos, caretPos);
      onChange && onChange(content.value, name);
    }
    catch (e) { }

    return false;
  };

  const getPrev = (content: any) => {
    var txt = content.value;
    var imgKey = content.getAttribute("img");

    if (txt.length === 0) {
      return;
    };
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_WEBFORM + '/J.asmx/Encode',
      headers: { 'content-type': 'application/json;charset=utf-8' },
      data: '{"content":"' + encodeURIComponent(txt) + '","imgKey":"' + (imgKey === null ? "" : imgKey) + '"}'
    }).then(function (res: any) {
      preview(res.data.d);
    });
  };

  const preview = (txt: string) => {
    var html = "";

    html += "<html>";
    html += "<head>";
    html += "<title>Preview</title>";
    html += "</head>";
    html += "<body style='margin:10px;background:white;color:#333;font-family:Arial;font-size:14px;letter-spacing:.2pt'>";
    html += txt;
    html += "</body>";
    html += "</html>";

    var previewWin = window.open("", "preview", 'resizable=yes,scrollbars=yes,width=800,left=' + (window.screen.availWidth / 2 - 392) + ',top=20 height=' + 3 * window.screen.availHeight / 5);

    if (previewWin) {
      previewWin.document.getElementsByTagName('body')[0].innerHTML = '';
      previewWin.document.write(html);
      previewWin.focus();
    }
    return false;
  };

  const handleChange = () => {
    onChange && onChange((document.getElementById(name) as HTMLInputElement)?.value, name);
  };

  const colorArray = ["red", "green", "yellow", "purple", "orange", "brown", "gray"];

  return (
    <div className="editor">
      <div className="toolbar">
        <i className="fa fa-bold" onClick={() => insertTag(document.getElementById(name), "b")}></i>
        <i className="fa fa-italic" onClick={() => insertTag(document.getElementById(name), "i")}></i>
        <i className="fa fa-underline" onClick={() => insertTag(document.getElementById(name), "u")}></i>
        <i className="fa fa-list-ul" onClick={() => insertTag(document.getElementById(name), "l")}></i>
        <i className="fa fa-paint-brush" onMouseOver={() => setPaintVisible(true)} onMouseLeave={() => setPaintVisible(false)}>
          {paintVisible && colorArray.map(color => {
            return (
              <span key={color} className="color" style={{ background: color, display: "revert" }} onClick={() => insertTag(document.getElementById(name), color)}></span>
            )
          })}
        </i>
        <i className="prev fa fa-eye" title="preview" onClick={() => getPrev(document.getElementById(name))} ></i>
      </div>
      <textarea
        name={name}
        id={name}
        rows={rows ? rows : 18}
        cols={20}
        className={className ? className : "full"}
        placeholder={placeholder}
        required={required}
        value={value ?? ""}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default Editor;