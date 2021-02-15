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
    useNpm: new Flag({ flag: "--use-npm", label: "--use-npm" }),
    template: new Flag({
      flag: "--template",
      label: "--template",
      showInputs: true,
    }),
  },
};

const createVueFlags = {
  optionsBeforeName: true,
  flags: {
    usePreset: new Flag({
      flag: "--preset",
      label: "--preset",
      showInputs: true,
    }),
    useDefault: new Flag({ flag: "--default", label: "--default" }),
    useInlinePreset: new Flag({
      flag: "--inlinePreset",
      label: "--inlinePreset",
      showInputs: true,
    }),
    packageManager: new Flag({
      flag: "--packageManager",
      label: "--packageManager",
      showInputs: true,
    }),
    registry: new Flag({
      flag: "--registry",
      label: "--registry",
      showInputs: true,
    }),
    git: new Flag({
      flag: "--git",
      label: "--git",
      showInputs: true,
    }),
    force: new Flag({ flag: "--force", label: "--git" }),
    clone: new Flag({ flag: "--clone", label: "--clone" }),
    proxy: new Flag({ flag: "--proxy", label: "--proxy" }),
    bare: new Flag({ flag: "--bare", label: "--bare" }),
  },
};

const angularFlags = {
  flags: {
    collection: new Flag({
      flag: "--collection",
      label: "--collection",
      showInputs: true,
    }),
    commit: new Flag({
      flag: "--commit",
      label: "--commit",
    }),
    createApplication: new Flag({
      flag: "--create-application",
      label: "--create-application",
    }),
    defaults: new Flag({
      flag: "--defaults",
      label: "--defaults",
    }),
    direction: new Flag({
      flag: "--directory",
      label: "--directory",
      showInputs: true,
    }),
    dryRun: new Flag({
      flag: "--dry-run",
      label: "--dry-run",
    }),
    force: new Flag({
      flag: "--force",
      label: "--force",
    }),
    help: new Flag({
      flag: "--help",
      label: "--help",
    }),
    inlineStyle: new Flag({
      flag: "--inline-style",
      label: "--line-style",
    }),
    inlineTemplate: new Flag({
      flag: "--inline-template",
      label: "--inline-template",
    }),
    interactive: new Flag({
      flag: "--interactive",
      label: "--interactive",
    }),
    legacyBrowsers: new Flag({
      flag: "--legacy-browsers",
      label: "--legacy-browsers",
    }),
    minimal: new Flag({
      flag: "--minimal",
      label: "--minimal",
    }),
    newProjectRoot: new Flag({
      flag: "--new-project-root",
      label: "--new-project-root",
      showInputs: true,
    }),
    packageManager: new Flag({
      flag: "--package-manager",
      label: "--package-manager",
      showInputs: true,
    }),
    prefix: new Flag({
      flag: "--prefix",
      label: "--prefix",
      showInputs: true,
    }),
    routing: new Flag({
      flag: "--routing",
      label: "--routing",
    }),
    skipGit: new Flag({
      flag: "--skip-git",
      label: "--skip-git",
    }),
    skipInstall: new Flag({
      flag: "--skip-install",
      label: "--skip-install",
    }),
    skipTests: new Flag({
      flag: "--skip-tests",
      label: "--skip-tests",
    }),
    strict: new Flag({
      flag: "--strict",
      label: "--strict",
    }),
    style: new Flag({
      flag: "--style",
      label: "--style",
      showInputs: true,
    }),
    verbose: new Flag({
      flag: "--verbose",
      label: "--verbose",
    }),
    viewEncapsulation: new Flag({
      flag: "--view-encapsulation",
      label: "--view-encapsulation",
      showInputs: true,
    }),
  },
};
export default {
  "Create React App": createReactAppFlags,
  Vue: createVueFlags,
  Angular: angularFlags,
};
