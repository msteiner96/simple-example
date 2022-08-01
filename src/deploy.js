import { Secp256k1HdWallet, SigningCosmWasmClient } from "cosmwasm";
import { readFileSync } from "fs";
import { config } from "./utils/example";
const mnemonic = "fortune window route bench scan matter wrist cheese family easy salon shift";
async function deploy() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
    const account = (await wallet.getAccounts())[0].address;
    const signer = await SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, wallet);
    const path = "../dsrv-poap/artifacts/dsrv_poap-aarch64.wasm";
    console.info(`Loading from ${path}...`);
    const wasm = await readFileSync(path);
    const receipt = await signer.upload(account, wasm, "auto", `Upload POAP`);
    console.debug(`Uploaded with CodeID: ${receipt.codeId}`);
    const data = await signer.instantiate(account, receipt.codeId, {}, "POAP", "auto", { admin: account });
    console.debug(`Instantiated with InstanceID: ${data.contractAddress}`);
}
deploy().then(() => console.log("done"));
