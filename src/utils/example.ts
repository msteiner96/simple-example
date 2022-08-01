import { GasPrice, setupWebKeplr } from "cosmwasm";

interface conf {
  chainId: string;
  rpcEndpoint: string;
  faucetEndpoint: string;
  prefix: string;
  feeDenom: string;
  dsrvPoapContractAddress: string;
  gasPrice: GasPrice;
}

export const config: conf = {
  chainId: "malaga-420",
  rpcEndpoint: "https://rpc.malaga-420.cosmwasm.com",
  faucetEndpoint: "https://faucet.malaga-420.cosmwasm.com",
  prefix: "wasm",
  feeDenom: "umlg",
  dsrvPoapContractAddress: "wasm1zeqcpm7fdeqdac8e0uuu27p8acmtp9pggdgltyc6mwt4xwqywgpspfr7rw",
  gasPrice: GasPrice.fromString("0.05umlg"),
};

export const keplrChainInfo = {
  chainId: config.chainId,
  chainName: "Malaga 420",
  rpc: config.rpcEndpoint,
  rest: "https://api.malaga-420.cosmwasm.com",
  stakeCurrency: {
    coinDenom: "MLG",
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
    { coinDenom: "umlg", coinMinimalDenom: "umlg", coinDecimals: 6 },
  ],
  currencies: [{ coinDenom: "MLG", coinMinimalDenom: "umlg", coinDecimals: 6 }],
  features: ["stargate"],
  gasPriceStep: { low: 0.03, average: 0.05, high: 0.08 },
};

export async function getClient() {
  await (window as any).keplr.experimentalSuggestChain(keplrChainInfo);
  const offlineSigner = (window as any).getOfflineSignerOnlyAmino(config.chainId);
  const accounts = await offlineSigner
    .getAccounts()
    .catch((e) => console.log(e));
  const signingClient = await setupWebKeplr(config);
  return { accounts, signingClient };
}
