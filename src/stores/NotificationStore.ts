import { observable, action } from 'mobx';

interface INotification {
  id: string; //random guid for exmple: 9c3638a3-34bb-41b9-9c25-936d51854331
  description: string; //text
  iconUrl?: string; //url
  icon?: string; //base64
  date: string; //date time
  read: boolean; //read or unread
  state: any; // state passed from outside
  callback?: (state: any) => void; //callback
}

export class NotificationStore {

  @observable
  public notifications: Array<INotification> = [];

  @action
  public setNotifications(items: Array<INotification>) {
    this.notifications = items;
  }
}
