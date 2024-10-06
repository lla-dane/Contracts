import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingModule = buildModule("VotingModule", (m) => {
  const voting = m.contract("Voting", [["MARK", "HARRY", "BISHOP"], 18000]);
  return voting;
});

module.exports = VotingModule;
