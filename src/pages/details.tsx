import React, { useState } from "react";
import { config } from "../utils/example";
import { Coin } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "cosmwasm";

interface Props {
    // main account
    account: string;
    client: SigningCosmWasmClient;
}

// markup
const DetailsPage = (props: Props) => {
  const [balance, setBalance] = useState<Coin>({ amount: "0", denom: config.feeDenom });

  const checkBalance = async () => {
    // hit faucet
    const coins = await props.client.getBalance(props.account, config.feeDenom);
    setBalance(coins);
  };

  return (
    <main>
        <button onClick={checkBalance}>Check Balance</button>
        <div>
          <p>My Wallet is: {props.account}</p>
          <p>My Balance: {balance.amount} {balance.denom}</p>
        </div>
    </main>
  );
};

export default DetailsPage;
