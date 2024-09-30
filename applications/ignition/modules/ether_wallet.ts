import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WalletModule = buildModule("WalletModule", (m) => {
  const wallet = m.contract("EtherWallet");
  return { wallet };
});

module.exports = WalletModule;
