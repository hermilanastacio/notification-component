/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { RingerSolidIcon, MoreIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import styles from './NotificationComponent.module.scss';
import { useBoolean } from '@uifabric/react-hooks';
import { useStore } from '../common/stores';
import { observer } from 'mobx-react';
import moment from 'moment';

const classes = mergeStyleSets({
  callout: {
    width: 320
  }
});

const NotificationComponent: React.FC = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(true);
  const { notificationStore } = useStore();

  return(
    <div className={styles.container}>
      
      <div className={styles.bellWrapper} onClick={toggleIsCalloutVisible}>
        <span className={styles.badge}>
          {notificationStore.notifications.filter(notif => notif.isRead === false).length}
        </span>
        <RingerSolidIcon style={{fontSize:25}} className="bellBtn"/>
      </div>

      <React.Fragment>
        {isCalloutVisible && (
          <Callout
            className={classes.callout}
            role="alertdialog"
            gapSpace={0}
            target={'.bellBtn'}
            directionalHint={DirectionalHint.bottomCenter}
            directionalHintFixed
            setInitialFocus
          >
            <div className={styles.callOutHeader}>
              <span className={styles.notifLabel}>
                Notifications
              </span>
              <MoreIcon className={styles.moreIcon}/>
            </div>

            <Pivot className={styles.tabbedContentWrapper}>
              <PivotItem headerText="All">
                {notificationStore.notifications.map(notif => 
                  <div key={notif.id} className={`${styles.notificationCard} ${!notif.isRead ? styles.unRead : ''}`}>
                    <img src={notif.iconUrl} alt="icon" className={styles.iconImg}/>
                    <div className={styles.notifDetailsWrapper}>
                      <p className={styles.descText}>
                        {notif.description}
                      </p>
                      <span className={styles.dateText}>
                        {moment(notif.date).fromNow()}
                      </span>
                    </div>
                    <MoreIcon className={styles.moreIcon}/>
                  </div>
                )}
              </PivotItem>
              <PivotItem headerText="Unread">
                {notificationStore.notifications.map(notif => {
                  if(!notif.isRead) {
                    return(
                      <div key={notif.id} className={`${styles.notificationCard} ${!notif.isRead ? styles.unRead : ''}`}>
                        <img src={notif.iconUrl} alt="icon" className={styles.iconImg}/>
                        <div className={styles.notifDetailsWrapper}>
                          <p className={styles.descText}>
                            {notif.description}
                          </p>
                          <span className={styles.dateText}>
                            {moment(notif.date).fromNow()}
                          </span>
                        </div>
                        <MoreIcon className={styles.moreIcon}/>
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
