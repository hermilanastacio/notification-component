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
    maxWidth: 360,  
    minWidth: 300
  }
});

const NotificationComponent: React.FC = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(true);
  const [showItemMore, setShowItemMore] = useState(false);
  const [showNotifContext, setShowNotifContext] = useState(false);
  const { notificationStore } = useStore();

  let unreadNotifCount = notificationStore.notifications.filter(n => n.isRead === false).length;

  let newNotifications = notificationStore.notifications.filter(n => moment(n.date).isSame(moment(), 'day'));
  let earlierNorifications = notificationStore.notifications.filter(n => !moment(n.date).isSame(moment(), 'day'));

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

  const handleUnreadNotification = (id: string) => {
    notificationStore.unreadNotification(id);
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
              <MoreIcon className={`notif-context ${styles.moreIcon}`} onClick={() => setShowNotifContext(true)}/>
            </div>
            {showNotifContext &&
              <Callout
                className={classes.callout}
                onDismiss={() => setShowNotifContext(false)}
                role="alertdialog"
                gapSpace={0}
                target={'.notif-context'}
                directionalHint={DirectionalHint.bottomRightEdge}
                directionalHintFixed
                setInitialFocus
              >
                <span 
                  onClick={() => notificationStore.markAllNotificationsAsRead()}
                  className={styles.moreItem}
                >
                  <AcceptIcon className={styles.moreItemIcon}/>
                  Mark all as read
                </span>
                <span 
                  onClick={() => notificationStore.removeAllReadNotifications()} 
                  className={styles.moreItem}
                >
                  <RemoveFilterIcon className={styles.moreItemIcon}/>
                  Remove all read
                </span>
              </Callout>
            }

            <Pivot className={styles.tabbedContentWrapper}>
              <PivotItem headerText="All">
                {hasNotifications()
                  ? <React.Fragment>
                      {newNotifications && newNotifications.length > 0 &&
                        <React.Fragment>
                          <Separator alignContent="start" style={{fontWeight:"bold"}}>
                            <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                              New
                            </span>
                          </Separator>
                          {newNotifications.map(notif =>
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
                          )}
                        </React.Fragment>
                      }
                      {earlierNorifications && earlierNorifications.length > 0 &&
                        <React.Fragment>
                          <Separator alignContent="start" style={{fontWeight:"bold"}}>
                            <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                              Earlier
                            </span>
                          </Separator>
                          {earlierNorifications.map(notif => 
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
                          )}
                        </React.Fragment>
                      }
                    </React.Fragment>
                  : <NoNotifications/>
                }
                {showItemMore &&
                  <Callout
                    className={classes.callout}
                    onDismiss={() => setShowItemMore(false)}
                    role="alertdialog"
                    gapSpace={0}
                    target={`.item-${notificationStore.selectedNotification.id}`}
                    directionalHint={DirectionalHint.leftCenter}
                    directionalHintFixed
                    setInitialFocus
                  >
                    {notificationStore.selectedNotification.isRead
                      ? <span 
                          onClick={() => handleUnreadNotification(
                            notificationStore.selectedNotification.id
                          )}
                          className={styles.moreItem}
                        >
                          <AcceptIcon className={styles.moreItemIcon}/>
                          Mark as unread
                        </span>
                      : <span 
                          onClick={() => handleReadNotification(
                            notificationStore.selectedNotification.id
                          )}
                          className={styles.moreItem}
                        >
                          <AcceptIcon className={styles.moreItemIcon}/>
                          Mark as read
                        </span>
                    }
                    <span 
                      onClick={handleRemoveNotification}
                      className={styles.moreItem}
                    >
                      <RemoveFilterIcon className={styles.moreItemIcon}/>
                      Remove this notification
                    </span>
                  </Callout>
                }
              </PivotItem>
              <PivotItem headerText="Unread">
                {hasUnreadNotification()
                  ? <React.Fragment>
                      {newNotifications && newNotifications.filter(n => !n.isRead).length > 0 &&
                        <React.Fragment>
                          <Separator alignContent="start" style={{fontWeight:"bold"}}>
                            <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                              New
                            </span>
                          </Separator>
                          {newNotifications.map(notif => {
                            if(!notif.isRead) {
                              return(
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
                              );
                            } else {
                              return null
                            }
                          })}
                        </React.Fragment>
                      }
                      {earlierNorifications && earlierNorifications.filter(n => !n.isRead).length > 0 &&
                        <React.Fragment>
                          <Separator alignContent="start" style={{fontWeight:"bold"}}>
                            <span style={{fontWeight:"bold", color:"#7f7f7f"}}>
                              Earlier
                            </span>
                          </Separator>
                          {earlierNorifications.map(notif => {
                            if(!notif.isRead) {
                              return(
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
                              );
                            } else {
                              return null
                            }
                          })}
                        </React.Fragment>
                      }
                    </React.Fragment>
                  : <NoUnreadNotifications/>
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
            </Pivot>

          </Callout>
        )}
      </React.Fragment>
    </div>
  );
};

export default observer(NotificationComponent);
