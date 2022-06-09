const hre = require('hardhat');

async function main() {
    // DappTools ------------------------------------------------------
    console.log('Starting Deployment');
    const contractFactory = await hre.ethers.getContractFactory('DappTools');
    const contract = await contractFactory.deploy(0);
    await contract.deployed();
    const contractAddress = contract.address;
    console.log(`DappTools deployed to : ${contractAddress}`);
}

main()
    .then(() => console.log('Deployment Successful ✅'))
    .catch((error) => {
        console.error(error);
        console.log('Deployment Failed ❌');
    });
