import { Texture, TextureLoader } from "three";

export default function LoadTexture(textureFile: string): Texture {
  const textureLoader = new TextureLoader();
  return textureLoader.load(textureFile);
}