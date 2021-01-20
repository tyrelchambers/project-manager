import { makeObservable, observable } from "mobx";

class SearchStore {
  constructor() {
    makeObservable(this, {
      results: observable,
    });
  }

  results = [];

  search(query) {}
}

export default new SearchStore();
