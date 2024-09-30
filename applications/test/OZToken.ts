import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("OZToken", function () {
  async function deployOZTokenFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const OZToken = await ethers.getContractFactory("OZToken");
    const token = await OZToken.deploy("OZToken", "OZT");

    return { token, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Should set the right OZToken", async function () {
      const { token, owner, addr1 } = await loadFixture(deployOZTokenFixture);
      expect(await token.name()).to.equal("OZToken");
      expect(await ethers.provider.getBalance(owner.address)).to.equal(
        ethers.parseUnits("100", 18)
      );
    });
  });
});
