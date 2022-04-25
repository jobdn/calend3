import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { utils } from "ethers";
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
    await calend3.setRate(utils.parseEther("0.001"));
  });

  describe("deployment", async () => {
    it("calend3 contract should be proper address", async () => {
      expect(calend3.address).to.be.properAddress;
    });
  });

  describe("setRate", () => {
    it("should set the minutely rate", async () => {
      expect(await calend3.getRate()).to.eq(utils.parseEther("0.001"));
    });

    it("shoud be fail if not owner trying to set rate", async () => {
      await expect(calend3.connect(acc2).setRate(1000)).to.be.revertedWith(
        "Calend3: not owner"
      );
    });
  });

  describe("create and get appointments", () => {
    it("should fail if rate is zero", async () => {
      await calend3.setRate(0);
      await expect(
        calend3
          .connect(acc2)
          .addAppointment("Daily call at 11:00 AM", 1650865480, 1650865481)
      ).to.be.revertedWith("Calend3: rate is zero");
    });

    it("should be possible to create and get an approintments", async () => {
      await expect(
        await calend3
          .connect(acc2)
          // appointment for 1 minutes
          .addAppointment("Daily call at 11:00 AM", 1650865484, 1650865544, {
            value: utils.parseEther("0.001"),
          })
      ).to.changeEtherBalances(
        [owner, acc2],
        [utils.parseEther("0.001"), utils.parseEther("-0.001")]
      );

      const appointments = await calend3.getAppoinments();

      expect(appointments.length).to.eq(1);
      expect(appointments[0].amountPaid).to.eq(utils.parseEther("0.001"));
      expect(appointments[0].startTime).to.eq(1650865484);
      expect(appointments[0].endTime).to.eq(1650865544);
      expect(appointments[0].title).to.eq("Daily call at 11:00 AM");
      expect(appointments[0].attendee).to.eq(acc2.address);
    });

    it("should fail if time of appointment less than one minute", async () => {
      await expect(
        calend3
          .connect(acc2)
          .addAppointment("Daily call at 11:00 AM", 1650865480, 1650865481)
      ).to.be.revertedWith("Calend3: invalid time");
    });

    it("should fail if the attendee sends less than the required eth", async () => {
      await expect(
        calend3
          .connect(acc2)
          .addAppointment("Daily call at 11:00 AM", 1650865484, 1650865544, {
            value: utils.parseEther("0.0001"),
          })
      ).to.be.revertedWith("Calend3: require more eth");
    });
  });
});
