const coreLibraries = new Set([
  // A workspace library for a publish/subscribe
  // system of communication.
  '@mimit/shared',
]);

module.exports = {
  // Share core libraries, and avoid everything else
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig;
    }

    // Returning false means the library is not shared.
    return false;
  },
  name: "ispettori",
  exposes: {
    "./Module": "apps/ispettori/src/app/remote-entry/entry.module.ts",
  },
  scriptType: 'text/javascript'
};
