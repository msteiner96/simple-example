import React, { useState } from "react";
import { config } from "../utils/example";
// markup
const DetailsPage = (props) => {
    const [balance, setBalance] = useState({ amount: "0", denom: config.feeDenom });
    const checkBalance = async () => {
        // hit faucet
        const coins = await props.client.getBalance(props.account, config.feeDenom);
        setBalance(coins);
    };
    return (React.createElement("main", null,
        React.createElement("button", { onClick: checkBalance }, "Check Balance"),
        React.createElement("div", null,
            React.createElement("p", null,
                "My Wallet is: ",
                props.account),
            React.createElement("p", null,
                "My Balance: ",
                balance.amount,
                " ",
                balance.denom))));
};
export default DetailsPage;
