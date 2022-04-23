import { ethers } from "hardhat";
import { Calend3__factory } from "../typechain-types";

async function main() {
  const [owner] = await ethers.getSigners();
  const calend3 = await new Calend3__factory(owner).deploy();

  await calend3.deployed();

  console.log("Calend3 deployed to:", calend3.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
