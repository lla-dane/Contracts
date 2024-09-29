const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Counter contract", function () {
  async function deployFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const counter = await ethers.deployContract("Counter");
    return { counter, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Should set the counter to 0", async function () {
      const { counter, owner } = await loadFixture(deployFixture);
      expect(await counter.count()).to.equal(0);
    });

    it("Should change the count correctly", async function () {
      const { counter, owner, addr1 } = await loadFixture(deployFixture);

      await counter.inc();
      expect(await counter.count()).to.equal(1);

      await counter.connect(owner).inc();
      console.log("Count after changes:", await counter.count());
      expect(await counter.count()).to.equal(2);
    });
  });
});
