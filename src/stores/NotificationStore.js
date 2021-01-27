import { action, makeObservable, observable } from "mobx";

class NotificationStore {
  constructor() {
    makeObservable(this, {
      unread: observable,
      notifications: observable,
      setUnread: action,
      setNotifications: action,
    });
  }

  unread = 0;
  notifications = [];

  setUnread(num) {
    this.unread = num;
  }

  setNotifications(n) {
    this.notifications = n;
  }
}

export default new NotificationStore();
