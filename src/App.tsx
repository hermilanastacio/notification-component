import React from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import NotificationComponent from './NotificationComponent/NotificationComponent';

function App() {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);

  return (
    <div>
      <div style={{backgroundColor:"#64a5ff", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 50px"}}>
        <h2 style={{margin:0}}>Notification App</h2>
        <NotificationComponent isVisible={isCalloutVisible} onToggle={toggleIsCalloutVisible}/>
      </div>
    </div>
  );
}

export default App;
