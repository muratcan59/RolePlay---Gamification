import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

interface IItem {
  cvId: string;
  cvNameSurname: string;
  employerNameSurname: string;
  requestDate: string;
  canCanceled: boolean;
}

const Logic = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string>();
  const [items, setItems] = useState<IItem[]>([]);

  const list = async () => {
    await Service.DataAnonymizationRequestList({ startIndex: 0, dataCount: 1000 }).then((res: any) => setItems(res))
  };

  const cancel = (cvId: any) => {
    M.T("REQUEST_CANCEL_WARNING").then(c => {
      if (window.confirm(c)) {
        Service.DataAnonymizationCancel(cvId).then(res => {
          setItems(items.filter(p => p.cvId !== cvId));
          if (res) {
            M.T("REQUEST_CANCELED").then(setMessage);
          } else {
            setMessage("");
          }
        });
      }
    });
  };

  const remove = (cvId: any) => {
    M.T("CANDIDATE_DATA_DELETE_WARNING").then(c => {
      if (window.confirm(c)) {
        Service.DataAnonymizationDelete(cvId).then(res => {
          setItems(items.filter(p => p.cvId !== cvId));
          if (res) {
            M.T("CANDIDATE_DATA_DELETED").then(setMessage);
          } else {
            setMessage("");
          }
        });
      }
    });
  };

  useEffect(() => { M.T("TITLE").then(setTitle); }, []);
  useEffect(() => { document.title = title; }, [title]);
  useEffect(() => { list(); }, []);

  return   { cancel, remove, title, message, items };
};

export default Logic;