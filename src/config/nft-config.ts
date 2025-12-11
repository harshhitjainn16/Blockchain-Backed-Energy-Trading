import { Address } from 'viem';

/**
 * Story Protocol SPG NFT Implementation (Aeneid Testnet)
 * This is the implementation contract for SPG NFTs
 * Use this with the RegistrationWorkflows contract
 */
export const SPG_NFT_IMPL: Address = '0x5266215a00c31AaA2f2BB7b951Ea0028Ea8b4e37';

/**
 * Story Protocol SPG NFT Beacon (Aeneid Testnet)
 * Beacon contract that manages SPG NFT implementations
 */
export const SPG_NFT_BEACON: Address = '0xD2926B9ecaE85fF59B6FB0ff02f568a680c01218';

/**
 * Story Protocol Registration Workflows (Aeneid Testnet)
 * Main contract for registering IP Assets with PIL terms
 */
export const REGISTRATION_WORKFLOWS: Address = '0xbe39E1C756e921BD25DF86e7AAa31106d1eb0424';

/**
 * Default SPG NFT Contract to use
 * Note: For SPG, you should deploy your own NFT or use the workflows directly
 */
export const SPG_NFT_CONTRACT: Address = SPG_NFT_IMPL;

/**
 * PIL (Programmable IP License) Template Address
 */
export const PIL_TEMPLATE: Address = '0x58E2c909D557Cd23EF90D14f8fd21667A5Ae7a93';

/**
 * Story Protocol Gateway Address
 */
export const STORY_PROTOCOL_GATEWAY: Address = '0x78c6D75Cf2Dd32753d06C1a0D3c0487fDC5Aa150';