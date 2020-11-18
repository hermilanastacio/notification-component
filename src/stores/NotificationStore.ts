import { observable, action } from 'mobx';
import { INotification } from '../interfaces/INotification';
export class NotificationStore {

  @observable
  public notifications: Array<INotification> = [
    {
      id: "e355aacc-9cd1-4059-a351-3b67c7f75066",
      description: "Hermil Anastacio mentioned you in a comment.",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      isRead: false,
      state: null,
      callback: null
    },
    {
      id: "1d7346ee-7881-4594-b64e-f1f038ebfae2",
      description: "Hermil Anastacio mentioned you in a comment.",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      isRead: true,
      state: null,
      callback: null
    },
    {
      id: "1d7346ee-7881-4594-b64e-f1f038ebfae3",
      description: "Hermil Anastacio mentioned you in a comment.",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      isRead: false,
      state: null,
      callback: null
    },
    {
      id: "1d7346ee-7881-4594-b64e-f1f038ebfae6",
      description: "Hermil Anastacio mentioned you in a comment.",
      iconUrl: "https://cdn.iconscout.com/icon/free/png-512/overwatch-2-569226.png",
      icon: null,
      date: "2020-11-09T03:27:16.321",
      isRead: true,
      state: null,
      callback: null
    }
  ];

  @observable
  public selectedNotification: INotification | undefined

  @action
  public addNotification(notif: INotification) {
    this.notifications.unshift(notif);
  }

  @action
  public setSelectedNotification(notif: INotification) {
    this.selectedNotification = notif;
  }
}
