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
    const handleConnect = async () => {
        const { accounts, signingClient } = await getClient();
        const account = accounts[0].address;
        setAccount(account);
        setClient(signingClient);
        // hit faucet
        const coins = await signingClient.getBalance(account, config.feeDenom);
        setBalance(coins);
        if (coins.amount === "0") {
            setLoadingFaucet(true);
            await new FaucetClient(config.faucetEndpoint).credit(account, config.feeDenom);
            const coins = await signingClient.getBalance(account, config.feeDenom);
            setBalance(coins);
            setLoadingFaucet(false);
        }
    };
    const loadEvents = async () => {
        if (client !== undefined && account !== undefined) {
            const poap = new DsrvPoapClient(client, account, config.dsrvPoapContractAddress);
            const events = await poap.listAllEvents();
            setEvents(events.events);
        }
    };
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
