import * as React from 'react';
import { RingerRemoveIcon } from '@fluentui/react-icons';

export const NoNotifications: React.FC = () => {
  return(
    <p style={{textAlign:"center", padding:"40px 120px 60px 120px"}}>
      <RingerRemoveIcon style={{fontSize:35, margin: 5}}/>
      <br/>
      No notifications
    </p>
  );
};

export const NoUnreadNotifications: React.FC = () => {
  return(
    <p style={{textAlign:"center", padding:"40px 100px 60px 100px", whiteSpace:"nowrap"}}>
      <RingerRemoveIcon style={{fontSize:35, margin: 5}}/>
      <br/>
      No unread notifications
    </p>
  );
};
