import BN from 'bn.js';

export const PINK = "#FF009C";
export const O_PINK = "rgba(255,0,156, 0.4)";
export const BLUE = "#5400FF";
export const DARK_BLUE = "#0C004F";
export const LIGHT_GRAY = "#d3d3d3";
export const DARK_GRAY = "#DADADA";
export const API_URL = process.env.NODE_ENV === 'production' ? "https://api.flux.market" : "http://localhost:3001";
export const GREEN = "#26a65b"
export const YELLOW = "#F7CA18"
export const RED = "#f03434"
export const WHITE = "#FFFFFF"
export const TRACKING_ID = "UA-159992242-1";
export const NEAR_RPC_URL = "https://rpc.testnet.near.org"
export const PRE_PAID_GAS = new BN("10000000000000000");
export const ZERO = new BN("0");
export const CONTRACT_ID = "fluxprotocol-phase-point-two";