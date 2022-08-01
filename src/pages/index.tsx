import React, { useEffect, useState } from "react";
import { config, getClient } from "../utils/example";
import { Account, Coin } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "cosmwasm";
import { FaucetClient } from "@cosmjs/faucet-client";
import { DsrvPoapClient, GetEventResponse } from "../bindings/DsrvPoapContract";

// markup
const IndexPage = () => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [client, setClient] = useState<SigningCosmWasmClient | undefined>(undefined);
  const [balance, setBalance] = useState<Coin>({ amount: "0", denom: config.feeDenom });
  const [loadingFaucet, setLoadingFaucet] = useState<boolean>(false);
  const [events, setEvents] = useState<GetEventResponse[]>([]);

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
    if (client !== undefined && account !== undefined){
      const poap = new DsrvPoapClient(client, account, config.dsrvPoapContractAddress);
      const events = await poap.listAllEvents();
      setEvents(events.events);
    }
  }

  const registerDsrv = async () => {
    if (client !== undefined && account !== undefined){
      const poap = new DsrvPoapClient(client, account, config.dsrvPoapContractAddress);
      await poap.registerEvent({
        name: "DSRV Hacker House #2",
        description: "Even more.",
        image: "https://miro.medium.com/max/1400/1*R8chOI2RB3fwuInIBB28Gg.jpeg",
        startTime: 1659322235,
        endTime: 1659520235,
      });
      const events = await poap.listAllEvents();
      setEvents(events.events);
    }
  }

  return (
    <main>
      {account === undefined ? (
        <button onClick={handleConnect}>Connect to Keplr</button>
      ) : (
        <div>
          <p>Connected to address: {account}</p>
          <p>Balance: {balance.amount} {balance.denom}</p>
          { loadingFaucet && <p>Loading tokens from faucet...</p> }
          <br/>
          <p>Events: {events.length} <button onClick={loadEvents}>Load Events</button><ul> 
            { events.map(evt => <li>{evt.name} <img src={evt.image} width="600" height="480"></img></li>) }
          </ul></p>
          <p><button onClick={registerDsrv}>Register DSRV</button></p>
        </div>
      )}
    </main>
  );
};

export default IndexPage;
