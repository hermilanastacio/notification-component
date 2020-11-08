import * as React from 'react';
import { RingerSolidIcon } from '@fluentui/react-icons';

interface INotificationComponent {
  onToggle: () => void;
}

const NotificationComponent: React.FC<INotificationComponent> = ({ onToggle }) => {
  return(
    <div style={{position:"relative"}}>
      <span style={{backgroundColor:"red", position:"absolute", top:-5, right:-10, fontSize:12, fontWeight:"bold", width: 18, height:18, borderRadius:"50%", textAlign:"center"}}>3</span>
      <RingerSolidIcon style={{fontSize:25}} className="bellBtn" onClick={onToggle}/>
    </div>
  );
};

export default NotificationComponent;
