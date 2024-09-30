import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OZTokenModule = buildModule("OZTokenModule", (m) => {
  const token = m.contract("OZToken");
  return { token };
});

module.exports = OZTokenModule;
