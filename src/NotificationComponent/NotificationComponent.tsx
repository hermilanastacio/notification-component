/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { RingerSolidIcon, MoreIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';
import { useStore } from '../common/stores';
import { useBoolean } from '@uifabric/react-hooks';
import { observer } from 'mobx-react';
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
          {notificationStore.notifications.length}
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
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin: "15px 15px"}}>
              <span style={{fontSize:15, fontWeight:"bold"}}>
                Notifications
              </span>
            <MoreIcon/>
            </div>
            {notificationStore.notifications.map(n => 
              <div key={n.id} style={{display:"flex", alignItems:"center", margin:"5px 10px", padding:8, borderRadius:5, backgroundColor: !n.isRead ? "#f4f4f4" : ""}}>
                <img src={n.iconUrl} alt="icon" style={{height:50, width:50}}/>
                <div style={{margin:"0 10px 0 5px"}}>
                  <p style={{margin:"0 0 2px 0"}}>{n.description}</p>
                  <span style={{fontWeight: 600, fontSize:13}}>{moment(n.date).fromNow()}</span>
                </div>
                <MoreIcon/>
              </div>
            )}
          </Callout>
        )}
      </React.Fragment>
    </div>
  );
};

export default observer(NotificationComponent);
