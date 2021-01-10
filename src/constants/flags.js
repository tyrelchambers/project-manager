function Flag({ flag, label, showInputs, value }) {
  this.label = label;
  this.flag = flag;
  this.showInputs = showInputs;
  this.value = value;
  this.flagWithValue = function () {
    return `${this.flag} ${this.value ? this.value : ""}`;
  };
}

const createReactAppFlags = {
  useNpm: new Flag({ flag: "--use-npm", label: "Use NPM" }),
  template: new Flag({
    flag: "--template",
    label: "Use template",
    showInputs: true,
  }),
};

export default {
  "Create React App": createReactAppFlags,
};
