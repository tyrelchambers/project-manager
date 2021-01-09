function Flag({ flag, label }) {
  this.label = label;
  this.flag = flag;
  this.flagWithValue = function (value) {
    return `${flag} ${value ? value : ""}`;
  };
}

const createReactAppFlags = {
  useNpm: new Flag({ flag: "--use-npm", label: "Use NPM" }),
  useNpm1: new Flag({ flag: "--use-npm1", label: "Use NPM2" }),
};

export default {
  "Create React App": createReactAppFlags,
};
