/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { RingerSolidIcon, MoreIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { useBoolean } from '@uifabric/react-hooks';
import { useStore } from '../common/stores';
import { observer } from 'mobx-react';
import classes from './NotificationComponent.module.scss';
import moment from 'moment';

const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300
  },
});

const NotificationComponent: React.FC = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(true);
  const { notificationStore } = useStore();

  return(
    <div style={{position:"relative"}}>
      <div style={{position:"relative", cursor:"pointer"}} onClick={toggleIsCalloutVisible}>
        <span style={{backgroundColor:"red", position:"absolute", top:-11, right:-11, fontSize: 11, fontWeight:"bold", boxSizing:"content-box", width:"2em", height:"2em", lineHeight:"2em",  borderRadius:"50%", textAlign: "center"}}>
          {notificationStore.notifications.filter(notif => notif.isRead === false).length}
        </span>
        <RingerSolidIcon style={{fontSize:25}} className="bellBtn"/>
      </div>
      <React.Fragment>
        {isCalloutVisible && (
          <Callout
            className={styles.callout}
            role="alertdialog"
            gapSpace={0}
            target={'.bellBtn'}
            directionalHint={DirectionalHint.bottomCenter}
            directionalHintFixed
            setInitialFocus
          >
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin: "15px 15px 0px 15px"}}>
              <span style={{fontSize:15, fontWeight:"bold"}}>
                Notifications
              </span>
              <div className={classes.iconWrapper} style={{width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <MoreIcon style={{fontSize: 18}}/>
              </div>
            </div>

            <Pivot style={{padding:"0 10px 5px 10px"}}>
              <PivotItem headerText="All">
                {notificationStore.notifications.map(notif => 
                  <div key={notif.id} style={{display:"flex", alignItems:"center", margin:"5px 0", padding:8, borderRadius:5, cursor:"pointer", backgroundColor: !notif.isRead ? "#f4f4f4" : ""}}>
                    <img src={notif.iconUrl} alt="icon" style={{height:50, width:50}}/>
                    <div style={{margin:"0 10px 0 5px"}}>
                      <p style={{margin:"0 0 2px 0"}}>{notif.description}</p>
                      <span style={{fontWeight: 600, fontSize:13}}>{moment(notif.date).fromNow()}</span>
                    </div>
                    <MoreIcon/>
                  </div>
                )}
              </PivotItem>
              <PivotItem headerText="Unread">
                {notificationStore.notifications.map(notif => {
                  if(!notif.isRead) {
                    return(
                      <div key={notif.id} style={{display:"flex", alignItems:"center", margin:"5px 0", padding:8, borderRadius:5, cursor:"pointer", backgroundColor: !notif.isRead ? "#f4f4f4" : ""}}>
                        <img src={notif.iconUrl} alt="icon" style={{height:50, width:50}}/>
                        <div style={{margin:"0 10px 0 5px"}}>
                          <p style={{margin:"0 0 2px 0"}}>{notif.description}</p>
                          <span style={{fontWeight: 600, fontSize:13}}>{moment(notif.date).fromNow()}</span>
                        </div>
                        <MoreIcon/>
                      </div>
                    );
                  } else {
                    return null
                  }
                })}
              </PivotItem>
            </Pivot>

          </Callout>
        )}
      </React.Fragment>
    </div>
  );
};

export default observer(NotificationComponent);
