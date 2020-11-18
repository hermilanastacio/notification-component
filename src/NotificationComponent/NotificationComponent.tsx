/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState } from 'react';
import { RingerSolidIcon, MoreIcon, AcceptIcon, RemoveFilterIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint, Separator } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { INotification } from '../interfaces/INotification';
import styles from './NotificationComponent.module.scss';
import { useBoolean } from '@uifabric/react-hooks';
import { NoNotifications, NoUnreadNotifications } from './NoNotifications';
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
  const [showItemMore, setShowItemMore] = useState(false);
  const { notificationStore } = useStore();

  let unreadNotifCount = notificationStore.notifications.filter(n => n.isRead === false).length;

  const handleClickItemMore = (e: any, notif: INotification) => {
    e.stopPropagation();
    notificationStore.setSelectedNotification(notif);
    setShowItemMore(true);
  }

  const handleRemoveNotification = () => {
    notificationStore.removeNotification(
      notificationStore.selectedNotification.id
    );
    setShowItemMore(false);
  }

  const handleReadNotification = (id: string) => {
    notificationStore.readNotification(id);
    setShowItemMore(false);
  }

  const hasUnreadNotification = () => {
    if(unreadNotifCount > 0) {
      return true
    } else {
      return false
    }
  }

  const hasNotifications = () => {
    if(notificationStore.notifications.length > 0) {
      return true
    } else {
      return false
    }
  }

  return(
    <div className={styles.container}>
      
      <div className={styles.bellWrapper} onClick={toggleIsCalloutVisible}>
        {hasUnreadNotification() &&
          <span className={styles.badge}>
            {unreadNotifCount}
          </span>
        }
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
                  {hasNotifications()
                    ? notificationStore.notifications.map(notif => 
                      <div
                        className={`${styles.notificationCard} ${!notif.isRead ? styles.unRead : ''}`} 
                        onClick={() => handleReadNotification(notif.id)}
                        key={notif.id}
                      >
                        <img src={notif.iconUrl} alt="icon" className={styles.iconImg}/>
                        <div className={styles.notifDetailsWrapper}>
                          <p className={styles.descText}>
                            {notif.description}
                          </p>
                          <span className={styles.dateText}>
                            {moment(notif.date).fromNow()}
                          </span>
                        </div>
                        <MoreIcon 
                          className={`item-${notif.id} ${styles.moreIcon}`} 
                          onClick={(e) => handleClickItemMore(e, notif)}
                        />
                      </div>
                    ) : <NoNotifications/>
                  }

                {showItemMore
                  ? <Callout
                      className={classes.callout}
                      onDismiss={() => setShowItemMore(false)}
                      role="alertdialog"
                      gapSpace={0}
                      target={`.item-${notificationStore.selectedNotification.id}`}
                      directionalHint={DirectionalHint.leftCenter}
                      directionalHintFixed
                      setInitialFocus
                    >
                      <span 
                        onClick={() => handleReadNotification(
                          notificationStore.selectedNotification.id
                        )}
                        className={styles.moreItem}
                      >
                        <AcceptIcon className={styles.moreItemIcon}/>
                        Mark as read
                      </span>
                      <span 
                        onClick={handleRemoveNotification}
                        className={styles.moreItem}
                      >
                        <RemoveFilterIcon className={styles.moreItemIcon}/>
                        Remove this notification
                      </span>
                    </Callout>
                  : null
                }

                
              </PivotItem>
              <PivotItem headerText="Unread">
                {hasUnreadNotification()
                  ? notificationStore.notifications.map(notif => {
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
                            <MoreIcon 
                              className={`item-${notif.id} ${styles.moreIcon}`} 
                              onClick={(e) => handleClickItemMore(e, notif)}
                            />
                          </div>
                        );
                      } else {
                        return null
                      }
                    }) 
                  : <NoUnreadNotifications/>
                }
              </PivotItem>
            </Pivot>

          </Callout>
        )}
      </React.Fragment>
    </div>
  );
};

export default observer(NotificationComponent);
