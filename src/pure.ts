// `/pure` entry point: identical API to the main entry but WITHOUT the
// bare-import side effect (D1, 14.5.d). Nothing is injected until you call
// `loadOverflow()`. Use this in frameworks that want to control exactly when the
// CDN fetch happens (e.g. defer until checkout mounts).
export { loadOverflow } from './load';
export type {
  OverflowConstructor,
  OverflowInstance,
  OverflowOptions,
  PublicKey,
} from '../types';
