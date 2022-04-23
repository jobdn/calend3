import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Calend3, Calend3__factory } from "../typechain-types";

describe("Calend3", function () {
  let calend3: Calend3;
  let owner: SignerWithAddress;
  let acc2: SignerWithAddress;

  beforeEach(async () => {
    [owner, acc2] = await ethers.getSigners();
    calend3 = await new Calend3__factory(owner).deploy();
    await calend3.deployed();
  });

  describe("deployment", async () => {
    it("calend3 contract should be proper address", async () => {
      expect(calend3.address).to.be.properAddress;
    });
  });

  describe("setRate", () => {
    it("should set the minutely rate", async () => {
      await calend3.setRate(1000);
      expect(await calend3.getRate()).to.eq(1000);
    });

    it("shoud be fail if not owner trying to set rate", async () => {
      await expect(calend3.connect(acc2).setRate(1000)).to.be.revertedWith(
        "Calend3: not owner"
      );
    });
  });
});
