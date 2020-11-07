import { action, makeObservable, observable } from "mobx";

class UserStore {
  user = {};

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user) {
    this.user = user;
  }
}
export default new UserStore();
