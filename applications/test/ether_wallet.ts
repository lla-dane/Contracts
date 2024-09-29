import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("Wallet", function () {
  async function deployWalletFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const wallet = await EtherWallet.deploy();

    return { wallet, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { wallet, owner } = await loadFixture(deployWalletFixture);
      expect(await wallet.owner()).to.equal(await owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should receive and withdraw Ether", async function () {
      const { wallet, owner, addr1 } = await loadFixture(deployWalletFixture);
      const deposit = ethers.parseEther("1.3");

      const transaction = {
        to: wallet.getAddress(),
        value: deposit,
      };

      await owner.sendTransaction(transaction);
      expect(await ethers.provider.getBalance(wallet.getAddress())).to.equal(
        deposit
      );

      // console.log("Wallet balances: ", await wallet.getBalance());

      //Attemp to withdraw by another account
      const withdrawAttempt = wallet.connect(addr1).withdraw(deposit);
      await expect(withdrawAttempt).to.be.revertedWith("CALLER NOT AUTHORISED");

      // Attempt to withdraw by owner account
      await wallet.withdraw(ethers.parseEther("1.1"));
      expect(await wallet.getBalance()).to.equal(ethers.parseEther("0.2"));

      // console.log("Owner balance: ", await ethers.provider.getBalance(owner.address));
    });
  });
});
