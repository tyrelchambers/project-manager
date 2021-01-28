import { action, makeObservable, observable } from "mobx";

class NotificationStore {
  constructor() {
    makeObservable(this, {
      unread: observable,
      notifications: observable,
      setUnread: action,
      setNotifications: action,
      addNotification: action,
      readAll: action,
      clear: action,
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

  addNotification(n) {
    const clone = this.notifications;
    this.notifications = [n, ...clone];
  }

  readAll() {
    const clone = this.notifications;
    const arr = clone.map((x) => {
      return {
        ...x,
        unread: false,
      };
    });
    this.notifications = arr;
  }

  clear() {
    this.notifications = [];
  }
}

export default new NotificationStore();
