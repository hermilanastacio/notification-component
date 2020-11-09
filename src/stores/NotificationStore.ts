import { observable, action } from 'mobx';

interface INotification {
  id: string; //random guid for exmple: 9c3638a3-34bb-41b9-9c25-936d51854331
  description: string; //text
  iconUrl?: string; //url
  icon?: any; //base64
  date: string; //date time
  read: boolean; //read or unread
  state: any; // state passed from outside
  callback?: any; //callback
}

export class NotificationStore {

  @observable
  public notifications: Array<INotification> = [
    {
      id: "e355aacc-9cd1-4059-a351-3b67c7f75066",
      description: "Hermil Anastacio commented on your post",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      read: false,
      state: null,
      callback: null
    },
    {
      id: "1d7346ee-7881-4594-b64e-f1f038ebfae1",
      description: "Hermil Anastacio mentioned you in a comment",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      read: false,
      state: null,
      callback: null
    }
  ];

  @action
  public addNotification(notif: INotification) {
    this.notifications.unshift(notif);
  }
}
