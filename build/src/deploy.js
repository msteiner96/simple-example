var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Secp256k1HdWallet, SigningCosmWasmClient } from "cosmwasm";
import { readFileSync } from "fs";
import { config } from "./utils/example";
const mnemonic = "fortune window route bench scan matter wrist cheese family easy salon shift";
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield Secp256k1HdWallet.fromMnemonic(mnemonic);
        const account = (yield wallet.getAccounts())[0].address;
        const signer = yield SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, wallet);
        const path = "../dsrv-poap/artifacts/dsrv_poap-aarch64.wasm";
        console.info(`Loading from ${path}...`);
        const wasm = yield readFileSync(path);
        const receipt = yield signer.upload(account, wasm, "auto", `Upload POAP`);
        console.debug(`Uploaded with CodeID: ${receipt.codeId}`);
        const data = yield signer.instantiate(account, receipt.codeId, {}, "POAP", "auto", { admin: account });
        console.debug(`Instantiated with InstanceID: ${data.contractAddress}`);
    });
}
deploy().then(() => console.log("done"));
