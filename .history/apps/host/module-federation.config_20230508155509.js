const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const share = mf.share;
const sharedMappings = new mf.SharedMappings();

module.exports = {
  name: "host",
  remotes: ["commissari", "ispettori"],
  scriptType: 'text/javascript',
  plugins: [
    new ModuleFederationPlugin({

    shared: share({
      "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
      "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
      "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
      "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@ngx-translate/core":{ singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@mimit/shared":{ singleton: true, strictVersion: true, requiredVersion: 'auto' },
    
      ...sharedMappings.getDescriptors()
    })
  })
  ]
};
