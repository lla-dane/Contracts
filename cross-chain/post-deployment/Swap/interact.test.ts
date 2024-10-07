import "dotenv/config";

import { ethers } from "hardhat";

const ZRO1_ADDR = process.env.ZRO1_ADDR;
const ZRO2_ADDR = process.env.ZRO2_ADDR;

import { ZRO1_ABI } from "../../ABI";

async function main() {
  const [signer] = await ethers.getSigners();
  const token1Instance = new ethers.Contract(ZRO1_ADDR, ZRO1_ABI, signer);

  console.log(await token1Instance.name());
  console.log(await token1Instance.symbol());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
