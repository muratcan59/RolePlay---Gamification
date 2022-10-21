import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear
};

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning'
}

function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x:any)=> x && x.id === id));
}

function success(message:any, options:any) {
  alert({ ...options, type: AlertType.Success, message });
}

function error(message:string, options:any) {
  alert({ ...options, type: AlertType.Error, message });
  window.scrollTo(0, 0);
}

function info(message:any, options:any) {
  alert({ ...options, type: AlertType.Info, message });
}

function warn(message:any, options:any) {
  alert({ ...options, type: AlertType.Warning, message });
}

function alert(alert:any) {
  alert.id = alert.id || defaultId;;
  alertSubject.next(alert);
}

function clear(id = defaultId) {
  alertSubject.next({ id });
}

export default alertService;
