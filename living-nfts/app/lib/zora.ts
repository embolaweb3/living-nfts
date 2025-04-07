import { create1155 } from "@zoralabs/protocol-sdk";
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
