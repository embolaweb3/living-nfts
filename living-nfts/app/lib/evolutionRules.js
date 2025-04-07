export const checkEvolution = async () => {
    const [ethPrice, weather] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'),
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=London`)
    ]);
  
    const rules = [
      { 
        condition: ethPrice.data.ethereum.usd > 3000, 
        effect: "golden",
        message: "ETH above $3K! Your NFT turned golden."
      },
      {
        condition: weather.data.current.condition.text.includes("Rain"),
        effect: "weather",
        message: "Rain detected! Added stormy effects."
      }
    ];
  
    return rules.find(rule => rule.condition) || null;
  };