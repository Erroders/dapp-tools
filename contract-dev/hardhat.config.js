/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config({ path: __dirname + '/.env' });
require('@nomiclabs/hardhat-ethers');

module.exports = {
    solidity: '0.8.0',
    networks: {
        mumbai: {
            url: process.env.MUMBAI_ALCHEMY_URL || '',
            accounts: [`0x${process.env.MUMBAI_DEPLOYER_PRIV_KEY}`],
        },
    },
};
