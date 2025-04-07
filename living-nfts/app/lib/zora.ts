import { create1155,getToken} from "@zoralabs/protocol-sdk";
import { publicClient, getWalletClient,chain } from "./config";

interface MintParams {
  contractName: string;
  contractURI: string;
  tokenURI: string;
}



export const mintLivingNFT = async (params: MintParams) => {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  const { parameters, contractAddress } = await create1155({
    contract: {
      name: params.contractName,
      uri: params.contractURI
    },
    token: {
      tokenMetadataURI: params.tokenURI
    },
    account,
    publicClient
  });

  const hash =  await walletClient.writeContract({
    ...parameters,  
    account: account,
    chain: chain, 
  });
  return { hash, contractAddress };
};

export const getCurrentTokenURI = async (
  tokenContract: `0x${string}`,
  tokenId: bigint
): Promise<string> => {
  const { token } = await getToken({
    publicClient,
    tokenContract,
    tokenId, 
    mintType: "1155"
  });

  if (!token?.tokenURI) throw new Error("Token URI not found");
  return token.tokenURI;
};


export const prepareEvolution = async (
  tokenContract: `0x${string}`,
  tokenId: bigint,
  minterAccount: `0x${string}`
) => {
  // 1. Get token and prepareMint function
  const { prepareMint } = await getToken({
    tokenContract,
    mintType: "1155",
    tokenId,
    publicClient
  });

  if (!prepareMint) throw new Error("Minting not available");

  // 2. Prepare standard mint 
  return prepareMint({
    minterAccount,
    quantityToMint: BigInt(1)
  });
};