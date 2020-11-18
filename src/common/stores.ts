import { createContext, useContext } from 'react';
import { NotificationStore } from '../stores/NotificationStore';
import { create } from 'mobx-persist';
import { configure } from 'mobx';

const hydrate = create({
  storage: localStorage,
  jsonify: true
});

configure({ enforceActions: 'always' });

export class RootStore {
  public notificationStore = new NotificationStore();

  constructor() {
    hydrate('NOTIFICATIONS', this.notificationStore);
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);

export const useStore = (): RootStore => useContext(RootStoreContext);