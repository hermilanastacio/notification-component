import * as React from 'react';
import { Callout, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';

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

const Popup: React.FC<{isVisible: boolean, toggleVisibility: () => void}> = (props) => {
  return (
    <>
      {props.isVisible && (
        <Callout
          className={styles.callout}
          role="alertdialog"
          gapSpace={0}
          target={'.bellBtn'}
          directionalHint={DirectionalHint.bottomCenter}
          onDismiss={props.toggleVisibility}
          setInitialFocus
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro itaque dolore nisi deserunt minus similique aliquam consequuntur minima nulla id error nam cum sunt delectus fugiat, accusantium eos magnam non?</p>
        </Callout>
      )}
    </>
  );
};

export default Popup;