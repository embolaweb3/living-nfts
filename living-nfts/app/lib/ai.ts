import { generateEvolvedImage } from "./replicate"; //

export const evolveNFT = async (
  currentImageURL: string,
  trigger: 'eth_high' | 'weather_rain'
) => {
  const promptMap = {
    eth_high: "golden cyberpunk aesthetic, glowing edges",
    weather_rain: "watercolor rain effects, blue tones"
  };

  return await generateEvolvedImage({
    input_image: currentImageURL,
    prompt: promptMap[trigger]
  });
};