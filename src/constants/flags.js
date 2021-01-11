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
  flags: {
    useNpm: new Flag({ flag: "--use-npm", label: "Use NPM" }),
    template: new Flag({
      flag: "--template",
      label: "Use template",
      showInputs: true,
    }),
  },
};

const createVueFlags = {
  optionsBeforeName: true,
  flags: {
    usePreset: new Flag({
      flag: "--preset",
      label: "Use Preset",
      showInputs: true,
    }),
    useDefault: new Flag({ flag: "--default", label: "Use Default" }),
    useInlinePreset: new Flag({
      flag: "--inlinePreset",
      label: "Use Inline Present",
      showInputs: true,
    }),
    packageManager: new Flag({
      flag: "--packageManager",
      label: "Use a Package Manager",
      showInputs: true,
    }),
    registry: new Flag({
      flag: "--registry",
      label: "Use Specified Registry",
      showInputs: true,
    }),
    git: new Flag({
      flag: "--git",
      label: "Git Initialization",
      showInputs: true,
    }),
    force: new Flag({ flag: "--force", label: "Force" }),
    clone: new Flag({ flag: "--clone", label: "Clone" }),
    proxy: new Flag({ flag: "--proxy", label: "Proxy" }),
    bare: new Flag({ flag: "--bare", label: "Scaffold Bare" }),
  },
};

export default {
  "Create React App": createReactAppFlags,
  Vue: createVueFlags,
};
