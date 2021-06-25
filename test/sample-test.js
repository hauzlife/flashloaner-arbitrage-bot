// ethers is global variable here.

const {
  expect
} = require("chai");
const {
  expectRevert
} = require('@openzeppelin/test-helpers');
const {
  hre
} = require("hardhat");
// 1.
const totalSupplyBigNumberHex = ethers.BigNumber.from("0x52b7d2dcc80cd2e4000000");
const preMineBigNumberHex = ethers.BigNumber.from("0x108b2a2c28029094000000");
const airDropSize = "1000000000000000000000000"; // "0xD3C21BCECCEDA1000000"

describe("MODESTOToken state and transactions", function () {
  let MODESTOToken, modestoToken, owner, firstComer, secondComer; // seller is owner

  // We don't include events here 
  // because it was already handled in the previous post
  beforeEach(async () => {
    provider = ethers.getDefaultProvider();

    MODESTOToken = await ethers.getContractFactory("ModestoToken");
    modestoToken = await MODESTOToken.deploy();

    [owner, firstComer, secondComer, _] = await ethers.getSigners();
  });

  xit("Should test 'totalSupply' and other default values.", async function () {
    // 2.
    expect(await modestoToken.symbol()).to.equal("MODT");
    expect(await modestoToken.name()).to.equal("Um token modesto");
    expect(await modestoToken.decimals()).to.equal(18);

    const totalSupply = await modestoToken.totalSupply();
    expect(totalSupply).to.equal(totalSupplyBigNumberHex);

    // What the owner takes from the total supply
    const preMine = await modestoToken.balanceOf(owner.address);
    expect(preMine).to.equal(preMineBigNumberHex);
  });

  xit("Should test 'airdropTokens' and the contract and receiver balance change.", async function () {
    // 3.
    await expectRevert.unspecified(modestoToken.connect(firstComer).airdropTokens(firstComer.address));
    await expectRevert.unspecified(modestoToken.connect(secondComer).airdropTokens(secondComer.address));

    // From contract to a user
    await modestoToken.airdropTokens(firstComer.address);
    // Include contract balance also here.
    const firstComerBalance = await modestoToken.balanceOf(firstComer.address);
    expect(firstComerBalance.toString()).to.equal(airDropSize);
  });

  // 4.
  it("Should test 'transfer' from the owner to firstComer.", async function () {
    // From a user to another user
    const amountToTransfer = 1000000;
    await modestoToken.transfer(firstComer.address, amountToTransfer);

    let firstComerBalance = await modestoToken.balanceOf(firstComer.address);
    expect(firstComerBalance.toString()).to.equal(amountToTransfer.toString());
  });

  it("Should test 'approve' and 'allowance' from the owner to firstComer.", async function () {
    const amountForApproval = 1000000;
    await modestoToken.approve(firstComer.address, amountForApproval);

    const allowance = await modestoToken.allowance(owner.address, firstComer.address);
    expect(allowance.toString()).to.equal(amountForApproval.toString());
  });

  it("Should test 'approve', 'allowance' and 'transferFrom'.", async function () {
    const amountForApproval = 1000000;
    await modestoToken.approve(firstComer.address, amountForApproval);
    const allowance = await modestoToken.allowance(owner.address, firstComer.address);
    expect(allowance.toString()).to.equal(amountForApproval.toString());

    await modestoToken.connect(firstComer).transferFrom(owner.address, secondComer.address, amountForApproval);

    const secondComerBalance = await modestoToken.balanceOf(secondComer.address);
    expect(secondComerBalance.toString()).to.equal(amountForApproval.toString());
  });

  // 5.
  it("Should test 'releaseBNB' and it shouldn't affect the balance of other users (not owners)", async function () {
    const amountForApproval = 1000000;
    await modestoToken.approve(firstComer.address, amountForApproval);
    const allowance = await modestoToken.allowance(owner.address, firstComer.address);
    expect(allowance.toString()).to.equal(amountForApproval.toString());

    await modestoToken.connect(firstComer).transferFrom(owner.address, secondComer.address, amountForApproval);

    const secondComerBalance = await modestoToken.balanceOf(secondComer.address);
    expect(secondComerBalance.toString()).to.equal(amountForApproval.toString());

    await modestoToken.releaseBNB();
    expect(secondComerBalance.toString()).to.equal(amountForApproval.toString());
  });
});