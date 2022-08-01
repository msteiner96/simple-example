import { setupWebKeplr } from "cosmwasm";

interface conf {
  chainId: string;
  rpcEndpoint: string;
  prefix: string;
}

const config: conf = {
  chainId: "juno-1",
  rpcEndpoint: "https://rpc.malaga-420.cosmwasm.com",
  prefix: "juno",
};

export const keplrChainInfo = {
  chainId: config.chainId,
  chainName: "Malaga 420",
  rpc: config.rpcEndpoint,
  rest: "https://faucet.malaga-420.cosmwasm.com",
  stakeCurrency: {
    coinDenom: "mlg",
    coinMinimalDenom: "umlg",
    coinDecimals: 6,
  },
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "wasm",
    bech32PrefixAccPub: "wasmpub",
    bech32PrefixValAddr: "wasmvaloper",
    bech32PrefixValPub: "wasmvaloperpub",
    bech32PrefixConsAddr: "wasmvalcons",
    bech32PrefixConsPub: "wasmvalconspub",
  },
  feeCurrencies: [
    { coinDenom: "MLG", coinMinimalDenom: "umlg", coinDecimals: 6 },
  ],
  currencies: [{ coinDenom: "MLG", coinMinimalDenom: "umlg", coinDecimals: 6 }],
  features: ["stargate"],
  gasPriceStep: { low: 0.03, average: 0.05, high: 0.08 },
};

export async function getClient() {
  await window.keplr.experimentalSuggestChain(keplrChainInfo);
  const offlineSigner = window.getOfflineSignerOnlyAmino(config.chainId);
  const accounts = await offlineSigner
    .getAccounts()
    .catch((e) => console.log(e));
  const signingClient = await setupWebKeplr(config);
  return { accounts, signingClient };
}
