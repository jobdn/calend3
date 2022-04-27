import { artifacts, ethers } from "hardhat";
import { Calend3__factory } from "../typechain-types";
import fs from "fs";
import path from "path";

async function main() {
  const [owner] = await ethers.getSigners();
  const calend3 = await new Calend3__factory(owner).deploy();

  await calend3.deployed();

  console.log("Calend3 deployed to:", calend3.address);
  // TODO: change the CALEND3_ADDRESS in config.ts file while deploy is running
  saveFrontendFiles();
}

const saveFrontendFiles = () => {
  const contractDir = path.resolve(__dirname, "../frontend/src/contracts");
  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  const calend3Artifact = artifacts.readArtifactSync("Calend3");
  fs.writeFileSync(
    path.resolve(contractDir, "Calend3.json"),
    JSON.stringify(calend3Artifact, null, 2)
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
