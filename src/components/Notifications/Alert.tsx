import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alertService, AlertType } from '../../services/AlertService';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }:{ id:any, fade:any }) {
    const history = useHistory();
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {

        const subscription = alertService.onAlert(id)
            .subscribe((alert:any) => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter((x:any) => x.keepAfterRouteChange);
                        filteredAlerts.forEach((x:any)=> delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    setAlerts(alerts => ([...alerts, alert]));

                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        const historyUnlisten = history.listen(() => {
            alertService.clear(id);
        });

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert:any) {
        if (fade) {
            const alertWithFade = { ...alert, fade: true };
            setAlerts((alerts:any) => alerts.map((x:any) => x === alert ? alertWithFade : x));

            setTimeout(() => {
                setAlerts((alerts:any) => alerts.filter((x:any) => x !== alertWithFade));
            }, 250);
        } else {
            setAlerts((alerts:any) => alerts.filter((x:any) => x !== alert));
        }
    }

    function cssClasses(alert:any) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'SUCCESS',
            [AlertType.Error]: 'ERROR',
            [AlertType.Info]: 'INFO',
            [AlertType.Warning]: 'WARNING'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
    <>
    {alerts.map((alert, index) => (
        <div key={index} className="TABLE_INFO" style={{ padding: "0" }}>
        <div className={cssClasses(alert)} dangerouslySetInnerHTML={{ __html: alert.message }}></div>
      </div>
    ))}
    </>
    )
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export default Alert;