import { waffle } from 'hardhat'

import AssetTokenArtifact from '../artifacts/contracts/asset-token.sol/AssetToken.json'
import { AssetToken } from '../typechain-types/AssetToken'

const { deployContract } = waffle

describe('AssetToken', () => {
  let assetToken: AssetToken

  const provider = waffle.provider
  const [admin] = provider.getWallets()

  beforeEach(async () => {
    assetToken = (await deployContract(admin, AssetTokenArtifact, [
      10000,
      'FirstAssetToken',
      'FAT',
    ])) as AssetToken
  })

  describe('new AssetToken', () => {
    it('has given data', async () => {
      expect((await assetToken.totalSupply()).toNumber()).toEqual(10000)
      expect(await assetToken.name()).toEqual('FirstAssetToken')
      expect(await assetToken.symbol()).toEqual('FAT')
      expect(await assetToken.decimals()).toEqual(18)
    })

    it('increases the deployer balance', async () => {
      expect((await assetToken.balanceOf(admin.address)).toNumber()).toEqual(
        10000
      )
    })
  })
})
