const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("Token");

    return { hardhatToken, owner, addr1, addr2 };
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    // TRANSFER 50 TOKENS FROM OWNER TO ADDR1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // TRANSFER 10 TOKENS FROM ADDR1 TO ADDR2

    await hardhatToken.connect(addr1).transfer(addr2.address, 10);
    expect(await hardhatToken.balanceOf(addr2.address)).to.changeTokenBalances(
      hardhatToken,
      [addr1, addr2],
      [-10, 10]
    );
  });
});
