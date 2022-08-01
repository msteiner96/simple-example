import React, { useState } from "react";
import { getClient } from "../utils/example";
import { Account } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "cosmwasm";

// markup
const IndexPage = () => {
  const [wallet, setWallet] = useState<Account | undefined>(undefined);
  const [client, setClient] = useState<SigningCosmWasmClient | undefined>(undefined);

  const handleConnect = async () => {
    const { accounts, signingClient } = await getClient();
    setWallet(accounts[0]);
    setClient(signingClient);
  };

  return (
    <main>
      {wallet === undefined ? (
        <button onClick={handleConnect}>Connect to Keplr</button>
      ) : (
        <div>
          <p>Connected to address: {wallet.address}</p>
        </div>
      )}
    </main>
  );
};

export default IndexPage;
