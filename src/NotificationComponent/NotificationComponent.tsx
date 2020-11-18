/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState } from 'react';
import { RingerSolidIcon, MoreIcon, AcceptIcon, RemoveFilterIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint, Separator } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { INotification } from '../interfaces/INotification';
import styles from './NotificationComponent.module.scss';
import { useBoolean } from '@uifabric/react-hooks';
import { useStore } from '../common/stores';
import { observer } from 'mobx-react';
import moment from 'moment';

const classes = mergeStyleSets({
  callout: {
    maxWidth: 360
  }
});

const NotificationComponent: React.FC = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(true);
  const [showMore, setShowMore] = useState(false);
  const { notificationStore } = useStore();

  const handleClickMore = (notif: INotification) => {
    notificationStore.setSelectedNotification(notif);
    setShowMore(true);
  }

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
            onDismiss={toggleIsCalloutVisible}
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
                <Separator alignContent="start" style={{fontWeight:"bold"}}>
                  <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                    New
                  </span>
                </Separator>
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
                      <MoreIcon className={`item-${notif.id}`} onClick={() => handleClickMore(notif)}/>
                    </div>
                  )}

                {showMore
                  ? <Callout
                      className={classes.callout}
                      onDismiss={() => setShowMore(false)}
                      role="alertdialog"
                      gapSpace={0}
                      target={`.item-${notificationStore.selectedNotification 
                        && notificationStore.selectedNotification.id}`}
                      directionalHint={DirectionalHint.leftCenter}
                      directionalHintFixed
                      setInitialFocus
                    >
                      <span className={styles.moreItem}>
                        <AcceptIcon className={styles.moreItemIcon}/>
                        Mark as read
                      </span>
                      <span className={styles.moreItem}>
                        <RemoveFilterIcon className={styles.moreItemIcon}/>
                        Remove this notification
                      </span>
                    </Callout>
                  : null
                }





                <Separator alignContent="start" style={{fontWeight:"bold"}}>
                  <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                    Earlier
                  </span>
                </Separator>
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
