export interface INotification {
  id: string; //random guid for exmple: 9c3638a3-34bb-41b9-9c25-936d51854331
  description: string; //text
  iconUrl?: string; //url
  icon?: any; //base64
  date: string; //date time
  isRead: boolean; //read or unread
  state: any; // state passed from outside
  callback?: any; //callback
}