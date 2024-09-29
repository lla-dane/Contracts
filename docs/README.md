# Intialize a hardhat project (npm 7+)

### Setting up the environment

```bash
npm init
npm --save-dev hardhat
npx hardhat init (empty TS project)
```

Install necessary plugins

```bash
npm i --save-dev @nomicfoundation/hardhat-toolbox
npm i --save-dev @nomicfoundation/hardhat-ethers ethers
```

Add **hardhat-ethers** in **hardhat.config.ts** to use _ether.js_ in your tests

```ts
import "@nomicfoundation/hardhat-ethers";
```

### Compiling and testing

Run this command in the terminal

```bash
npx hardhat compile
npx hardhat test
```
