var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { config, getClient } from "../utils/example";
import { FaucetClient } from "@cosmjs/faucet-client";
import { DsrvPoapClient } from "../bindings/DsrvPoapContract";
// markup
const IndexPage = () => {
    const [account, setAccount] = useState(undefined);
    const [client, setClient] = useState(undefined);
    const [balance, setBalance] = useState({ amount: "0", denom: config.feeDenom });
    const [loadingFaucet, setLoadingFaucet] = useState(false);
    const [events, setEvents] = useState([]);
    const handleConnect = () => __awaiter(void 0, void 0, void 0, function* () {
        const { accounts, signingClient } = yield getClient();
        const account = accounts[0].address;
        setAccount(account);
        setClient(signingClient);
        // hit faucet
        const coins = yield signingClient.getBalance(account, config.feeDenom);
        setBalance(coins);
        if (coins.amount === "0") {
            setLoadingFaucet(true);
            yield new FaucetClient(config.faucetEndpoint).credit(account, config.feeDenom);
            const coins = yield signingClient.getBalance(account, config.feeDenom);
            setBalance(coins);
            setLoadingFaucet(false);
        }
    });
    const loadEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        if (client !== undefined && account !== undefined) {
            const poap = new DsrvPoapClient(client, account, config.dsrvPoapContractAddress);
            const events = yield poap.listAllEvents();
            setEvents(events.events);
        }
    });
    return (React.createElement("main", null, account === undefined ? (React.createElement("button", { onClick: handleConnect }, "Connect to Keplr")) : (React.createElement("div", null,
        React.createElement("p", null,
            "Connected to address: ",
            account),
        React.createElement("p", null,
            "Balance: ",
            balance.amount,
            " ",
            balance.denom),
        loadingFaucet && React.createElement("p", null, "Loading tokens from faucet..."),
        React.createElement("br", null),
        React.createElement("p", null,
            "Events: ",
            events.length,
            " ",
            React.createElement("button", { onClick: loadEvents }, "Load Events"),
            React.createElement("ul", null, events.map(evt => React.createElement("li", null,
                evt.name,
                " ",
                React.createElement("img", { src: "{evt.image}" })))))))));
};
export default IndexPage;
