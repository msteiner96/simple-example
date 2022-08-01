var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setupWebKeplr } from "cosmwasm";
export const config = {
    chainId: "malaga-420",
    rpcEndpoint: "https://rpc.malaga-420.cosmwasm.com",
    faucetEndpoint: "https://faucet.malaga-420.cosmwasm.com",
    prefix: "mlg",
    feeDenom: "umlg",
    dsrvPoapContractAddress: "",
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
        { coinDenom: "MLG", coinMinimalDenom: "umlg", coinDecimals: 6 },
    ],
    currencies: [{ coinDenom: "MLG", coinMinimalDenom: "umlg", coinDecimals: 6 }],
    features: ["stargate"],
    gasPriceStep: { low: 0.03, average: 0.05, high: 0.08 },
};
export function getClient() {
    return __awaiter(this, void 0, void 0, function* () {
        yield window.keplr.experimentalSuggestChain(keplrChainInfo);
        const offlineSigner = window.getOfflineSignerOnlyAmino(config.chainId);
        const accounts = yield offlineSigner
            .getAccounts()
            .catch((e) => console.log(e));
        const signingClient = yield setupWebKeplr(config);
        return { accounts, signingClient };
    });
}
