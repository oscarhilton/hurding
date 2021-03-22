import { TextureLoader } from "three";

export default function LoadTexture(textureFile: string) {
  const textureLoader = new TextureLoader();
  return textureLoader.load(textureFile);
}