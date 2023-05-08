module.exports = {
  name: "commissari",
  exposes: {
    "./Module": "apps/commissari/src/app/remote-entry/entry.module.ts",
  },
};
