import { action, makeObservable, observable } from "mobx";

class SearchStore {
  constructor() {
    makeObservable(this, {
      results: observable,
      postSnippet: observable,
      setResults: action,
    });
  }

  results = [];
  postSnippet = {};

  setPostSnippet(snippet) {
    console.log(snippet);
    this.postSnippet = snippet;
  }

  setResults(results) {
    this.results = results;
  }
}

export default new SearchStore();
