export default interface GlitchyNFT {
  $collection: string;
  $id: string;
  $read: Array<string>;
  $write: Array<string>;
  glitchyNFTBase64: string;
  glitchyNFTName: string;
  ownerName: string;
}
