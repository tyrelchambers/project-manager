import { action, makeObservable, observable } from "mobx";

class SearchStore {
  constructor() {
    makeObservable(this, {
      results: observable,
      setResults: action,
    });
  }

  results = [];

  setResults(results) {
    this.results = results;
  }
}

export default new SearchStore();
