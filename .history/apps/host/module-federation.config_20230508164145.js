// Core libraries such as react, angular, redux, ngrx, etc. must be
// singletons. Otherwise the applications will not work together.
const coreLibraries = new Set([
  // A workspace library for a publish/subscribe
  // system of communication.
  '@mimit/shared',
]);

module.exports = {
  // // Share core libraries, and avoid everything else
  // shared: (libraryName, defaultConfig) => {
  //   if (coreLibraries.has(libraryName)) {
  //     return defaultConfig;
  //   }

  //   // Returning false means the library is not shared.
  //   return false;
  // },
  name: "host",
  remotes: ["commissari", "ispettori"],
  scriptType: 'text/javascript'
};
