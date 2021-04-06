export const packageTemplate = ({
  packageName,
  packagesToInstall,
  bundler,
}) => {
  const scripts = () => {
    if (bundler.label === "Create React App") {
      return `
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "now-build": "react-scripts build"
      `;
    }

    if (bundler.label === "Vue") {
      return `
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
        `;
    }
  };

  return `{
  "name": "${packageName}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    ${packagesToInstall
      .map((pkg, id) => {
        return `"${pkg.name}": "^${pkg.version}"`;
      })
      .join(`,\n    `)}
  },
  "scripts": {
    ${scripts()}
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
}`;
};
