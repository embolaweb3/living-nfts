import { useAccount } from 'wagmi';
import EvolveButton from '../../components/EvolveButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NFTDetailPage() {
  const { query } = useRouter();
  const { address } = useAccount();
  const [nft, setNft] = useState<{
    id: number;
    image: string;
    evolutions: number[];
  } | null>(null);

  // Fetch NFT data 
  useEffect(() => {
    fetch(`/api/nft/${query.id}`)
      .then(res => res.json())
      .then(setNft);
  }, [query.id]);

  if (!nft) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">NFT #{nft.id}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={nft.image} 
            alt={`NFT ${nft.id}`}
            className="w-full rounded-lg border"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Evolve</h2>
          {address ? (
            <>
              <EvolveButton 
                contractAddress="0xYourContractAddress"
                currentTokenId={nft.id}
              />
              <p className="mt-2 text-sm text-gray-600">
                This will mint a new evolved version
              </p>
            </>
          ) : (
            <p>Connect wallet to evolve</p>
          )}

          {nft.evolutions.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium mb-2">Evolution History</h3>
              <div className="space-y-2">
                {nft.evolutions.map(id => (
                  <div key={id} className="text-blue-500 hover:underline">
                    <Link href={`/nft/${id}`}>View Version #{id}</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}