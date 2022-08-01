import React, { useState } from "react";
import { config, getClient } from "../utils/example";
import { Account, Coin } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "cosmwasm";
import { FaucetClient } from "@cosmjs/faucet-client";

// markup
const IndexPage = () => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [client, setClient] = useState<SigningCosmWasmClient | undefined>(undefined);
  const [balance, setBalance] = useState<Coin>({ amount: "0", denom: config.feeDenom });
  const [loadingFaucet, setLoadingFaucet] = useState<boolean>(false);

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
          <a href="/details">Look at details</a>
        </div>
      )}
    </main>
  );
};

export default IndexPage;
