import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { use, expect } from "chai";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { deployments, ethers } from "hardhat";

import { Options } from "@layerzerolabs/lz-v2-utilities";

describe("Counter Test", function () {
  // Constant representing a mock Endpoint ID for testing purposes
  const eidA = 1;
  const eidB = 2;
  // Declaration of variables to be used in the test suite
  let MyOApp: ContractFactory;
  let EndpointV2Mock: ContractFactory;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let endpointOwner: SignerWithAddress;
  let OApp1: Contract;
  let OApp2: Contract;
  let mockEndpointV2A: Contract;
  let mockEndpointV2B: Contract;

  // Before hook for setup that runs once before all tests in the block
  before(async function () {
    // Contract factory for our tested contract
    MyOApp = await ethers.getContractFactory("Counter");

    // Fetching the first three signers (accounts) from Hardhat's local Ethereum network
    const signers = await ethers.getSigners();

    addr1 = signers.at(0)!;
    addr2 = signers.at(1)!;
    endpointOwner = signers.at(2)!;

    const EndpointV2MockArtifact =
      await deployments.getArtifact("EndpointV2Mock");
    EndpointV2Mock = new ContractFactory(
      EndpointV2MockArtifact.abi,
      EndpointV2MockArtifact.bytecode,
      endpointOwner
    );
  });

  // beforeEach hook for setup that runs before each test in the block
  beforeEach(async function () {
    // Deploying a mock LZ EndpointV2 with the given Endpoint ID
    mockEndpointV2A = await EndpointV2Mock.deploy(eidA);
    mockEndpointV2B = await EndpointV2Mock.deploy(eidB);

    // Deploying two instances of MyOApp contract and linking them to the mock LZEndpoint
    OApp1 = await MyOApp.deploy(mockEndpointV2A.address, addr1.address);
    OApp2 = await MyOApp.deploy(mockEndpointV2B.address, addr2.address);

    // Setting destination endpoints in the LZEndpoint mock for each MyOApp instance
    await mockEndpointV2A.setDestLzEndpoint(
      OApp2.address,
      mockEndpointV2B.address
    );
    await mockEndpointV2B.setDestLzEndpoint(
      OApp1.address,
      mockEndpointV2A.address
    );

    // Setting each MyOApp instance as a peer of the other
    await OApp1
      .connect(addr1)
      .setPeer(eidB, ethers.utils.zeroPad(OApp2.address, 32));

    await OApp2
      .connect(addr2)
      .setPeer(eidA, ethers.utils.zeroPad(OApp1.address, 32));
  });
});
