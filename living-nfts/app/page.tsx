import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import  {EvolveButton}  from './components/EvolveButton';
// import { LivingNFTABI } from './contracts/LivingNFTABI';

interface NFT {
  id: number;
  image: string;
  evolvedFrom?: number;
}

export default function Home() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's NFTs (simplified)
  const { data: userNFTs } = useReadContract({
    abi: LivingNFTABI,
    address: '',
    functionName: 'getUserNFTs',
    args: [address || '0x0'],
    enabled: !!address
  });

  // Update local state when wallet changes
  useEffect(() => {
    if (userNFTs) {
      setNfts(userNFTs.map((nft: any) => ({
        id: Number(nft.tokenId),
        image: nft.uri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        evolvedFrom: nft.evolvedFrom ? Number(nft.evolvedFrom) : undefined
      })))
    }
  }, [userNFTs]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">LivingNFTs</h1>
        <p className="text-gray-600">NFTs that evolve over time</p>
      </header>

      {address ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={nft.image} 
                alt={`LivingNFT #${nft.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">#{nft.id}</h3>
                {nft.evolvedFrom && (
                  <p className="text-sm text-gray-500 mb-2">
                    Evolved from #{nft.evolvedFrom}
                  </p>
                )}
                <EvolveButton 
                  contractAddress="0xYourContractAddress"
                  currentTokenId={nft.id}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Connect your wallet to view NFTs
          </h2>
          {/* <w3m-button /> */}
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-12 p-6 bg-blue-50 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Collection Stats</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold">{nfts.length}</p>
            <p className="text-gray-600">Total NFTs</p>
          </div>
          <div>
            <p className="text-3xl font-bold">
              {nfts.filter(n => n.evolvedFrom).length}
            </p>
            <p className="text-gray-600">Evolved</p>
          </div>
          <div>
            <p className="text-3xl font-bold">
              {nfts.length > 0 
                ? Math.max(...nfts.map(n => n.id)) 
                : 0}
            </p>
            <p className="text-gray-600">Latest ID</p>
          </div>
        </div>
      </div>
    </div>
  );
}