declare global {
    interface Window {
      ethereum?: any; 
    }
  }

import { zora } from "viem/chains";
import { http, createPublicClient, createWalletClient,custom } from "viem";

export const chain = zora;
export const publicClient = createPublicClient({
  chain,
  transport: http()
});

export const getWalletClient = async () => {
  if (typeof window === 'undefined') throw new Error('No window object');
  return createWalletClient({
    chain,
    transport: custom(window.ethereum!)
  });
};