import * as React from 'react';
import { RingerSolidIcon } from '@fluentui/react-icons';
import Popup from './Popup';

interface INotificationComponent {
  isVisible: boolean;
  onToggle: () => void;
}

const NotificationComponent: React.FC<INotificationComponent> = ({ onToggle, isVisible }) => {
  return(
    <div style={{position:"relative"}}>
      <div style={{position:"relative", cursor:"pointer"}} onClick={onToggle}>
        <div style={{backgroundColor:"red", position:"absolute", top:-5, right:-10, fontSize:12, fontWeight:"bold", width: 18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>3</div>
        <RingerSolidIcon style={{fontSize:25}} className="bellBtn"/>
      </div>
      <Popup
        isVisible={isVisible}
        toggleVisibility={onToggle}
      />
    </div>
  );
};

export default NotificationComponent;
