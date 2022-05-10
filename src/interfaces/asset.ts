export default interface Asset {
  $collection: string;
  $id: string;
  $read: Array<string>;
  $write: Array<string>;
  assetName: string;
  assetBody: string;
}
