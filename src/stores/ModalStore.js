import { observable, action, makeObservable } from "mobx";

class ModalStore {
  isOpen = false;
  render = "";

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      render: observable,
      setRender: action,
      setIsOpen: action,
    });
  }

  setRender(comp) {
    this.render = comp;
  }

  setIsOpen(open) {
    this.isOpen = open;
  }
}

export default new ModalStore();
