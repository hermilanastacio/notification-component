import * as React from 'react';
import { RingerSolidIcon } from '@fluentui/react-icons';
import { Callout, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';

interface INotificationComponent {
  isVisible: boolean;
  onToggle: () => void;
}

const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
  },
});

const NotificationComponent: React.FC<INotificationComponent> = ({ onToggle, isVisible }) => {
  return(
    <div style={{position:"relative"}}>
      <div style={{position:"relative", cursor:"pointer"}} onClick={onToggle}>
        <div style={{backgroundColor:"red", position:"absolute", top:-5, right:-10, fontSize:12, fontWeight:"bold", width: 18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>3</div>
        <RingerSolidIcon style={{fontSize:25}} className="bellBtn"/>
      </div>
      <React.Fragment>
        {isVisible && (
          <Callout
            className={styles.callout}
            role="alertdialog"
            gapSpace={0}
            target={'.bellBtn'}
            directionalHint={DirectionalHint.bottomCenter}
            onDismiss={onToggle}
            setInitialFocus
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro itaque dolore nisi deserunt minus similique aliquam consequuntur minima nulla id error nam cum sunt delectus fugiat, accusantium eos magnam non?</p>
          </Callout>
        )}
      </React.Fragment>
    </div>
  );
};

export default NotificationComponent;
