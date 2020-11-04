import React from 'react';
import { RingerSolidIcon } from '@fluentui/react-icons';
import { useBoolean } from '@uifabric/react-hooks';
import Popup from './Popup';

function App() {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);

  return (
    <div>
      <div style={{backgroundColor:"#64a5ff", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 50px"}}>
        <h2 style={{margin:0}}>Notification App</h2>
        <RingerSolidIcon style={{fontSize:20}} className="bellBtn" onClick={toggleIsCalloutVisible}/>
      </div>
      <Popup
        isVisible={isCalloutVisible}
        toggleVisibility={toggleIsCalloutVisible}
      />
    </div>
  );
}

export default App;
