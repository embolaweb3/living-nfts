export const generateEvolvedImage = async (baseImageUrl, evolutionType) => {
    const prompt = {
      "glow": "ethereal neon glow, cyberpunk",
      "weather": "stormy atmosphere, rain streaks",
      "golden": "gold foil texture, luxurious"
    }[evolutionType];
  
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: `${prompt}, NFT artwork`,
          image: baseImageUrl
        }
      })
    });
  
    return (await response.json()).output[0];
  };