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
    if (!user.name) {
      user.name = user.email;
    }
    this.user = user;
  }
}
export default new UserStore();
