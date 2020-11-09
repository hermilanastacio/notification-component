import React from 'react';
import NotificationComponent from './NotificationComponent/NotificationComponent';

function App() {
  return (
    <div>
      <div style={{backgroundColor:"#64a5ff", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 50px"}}>
        <h2 style={{margin:0}}>Notification App</h2>
        <NotificationComponent/>
      </div>
    </div>
  );
}

export default App;
