import { NextApiRequest, NextApiResponse } from 'next';
import { create } from 'ipfs-http-client';
import { getToken } from "@zoralabs/protocol-sdk";
import { publicClient } from '../lib/config';

// Connect to Infura IPFS 
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_INFURA_IPFS_ID}:${process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET}`
    ).toString('base64')}`
  }
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { contractAddress, currentTokenId, trigger } = req.body;

  try {
    // 1. Generate new metadata
    const newMetadata = {
      name: `Evolved NFT #${currentTokenId}`,
      description: "Dynamically evolved NFT",
      image: "image.com",
      attributes: [
        { trait_type: "Evolution", value: trigger },
        { trait_type: "Original", value: currentTokenId }
      ]
    };

    // 2. Upload to IPFS directly
    const { cid } = await ipfs.add(JSON.stringify(newMetadata));
    const newURI = `ipfs://${cid}`;

    // 3. Prepare mint (Zora 1155)
    const tokenData = await getToken({
      tokenContract: contractAddress as `0x${string}`,
      mintType: "1155",
      publicClient
    });

    // Ensure prepareMint exists before calling it
    if (!tokenData.prepareMint) {
      return res.status(500).json({ error: "prepareMint function is undefined" });
    }

    const { parameters } = tokenData.prepareMint({
      minterAccount: req.headers.walletaddress as `0x${string}`, 
      quantityToMint: BigInt(1)
    });

    res.status(200).json({
      newTokenId: Number(currentTokenId) + 1,
      newURI,
      txParams: parameters
    });

  } catch (error) {
    console.error("Evolution error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Evolution failed" });
  }
}
