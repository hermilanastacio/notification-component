import React, { useState } from 'react';
import NotificationComponent from './NotificationComponent/NotificationComponent';
import { useStore } from './common/stores';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [desc, setDesc] = useState("");
  const { notificationStore } = useStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(desc) {
      notificationStore.addNotification(
        {
          id: uuidv4(),
          description: desc,
          iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
          icon: null,
          date: new Date().toISOString(),
          isRead: false,
          state: null,
          callback: null
        }
      )
    }
  }

  return (
    <div>
      <div style={{backgroundColor:"#64a5ff", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 50px"}}>
        <h2 style={{margin:0}}>Notification App</h2>
        <NotificationComponent/>
      </div>

      <form style={{padding:50}}>
        <label>Description:</label>
        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
        <br/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
