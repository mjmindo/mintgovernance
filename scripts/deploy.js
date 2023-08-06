const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`, //0x4C74788c26Ea192305Ee3D3b83B0c7AA22917452
    `Token deployed to ${token.address}` //0xF73Eb7B1b7E5586bB6076670C285bc75cFa5BC2A
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
