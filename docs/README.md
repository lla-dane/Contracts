# Intialize a hardhat project (npm 7+)

## Setting up the environment

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

## Compiling and testing

Run this command in the terminal

```bash
npx hardhat compile
npx hardhat test
```

## Deployment 

Refer to Hardhat deployment [docs](https://hardhat.org/tutorial/deploying-to-a-live-network)

### To the Hardhat local network: 

After setting ignition/module/{CONTRACT-NAME}.ts file, run command:
```bash
npx hardhat ignition deploy ./ignition/modules/<CONTARCT-NAME>.ts
```

### **To remote networks:**

Store configuration variables in this way: 
```bash
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set SEPOLIA_PRIVATE_KEY
```

Set up **hardhat.config.ts** as given in the [docs](https://hardhat.org/tutorial/deploying-to-a-live-network). After that run this command



