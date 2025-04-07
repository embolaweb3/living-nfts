import { NextApiRequest, NextApiResponse } from 'next';
import { updateTokenURI, } from '../lib/zora';
import { evolveNFT } from '../lib/ai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { contractAddress, tokenId, trigger } = req.body;

  try {
    // 1. Generate new art
    const currentURI = await getCurrentTokenURI(contractAddress, tokenId);
    const newImage = await evolveNFT(currentURI, trigger);
    
    // 2. Update on-chain
    await updateTokenURI(contractAddress, newImage);
    
    res.status(200).json({ success: true, newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Evolution failed" });
  }
}