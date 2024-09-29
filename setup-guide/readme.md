## SETUP GUIDE

```
npm init
npm install --save-dev hardat 

npx hardat init (choose any kind of plugin)

npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### Add this line in hardat.config.js

``` js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
};
```