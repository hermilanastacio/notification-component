import { createContext, useContext } from 'react';
import { NotificationStore } from '../stores/NotificationStore';
import { configure } from 'mobx';

configure({ enforceActions: 'always' });

export class RootStore {
  public notificationStore = new NotificationStore();
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);

export const useStore = (): RootStore => useContext(RootStoreContext);