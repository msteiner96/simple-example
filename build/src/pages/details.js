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
import { config } from "../utils/example";
// markup
const DetailsPage = (props) => {
    const [balance, setBalance] = useState({ amount: "0", denom: config.feeDenom });
    const checkBalance = () => __awaiter(void 0, void 0, void 0, function* () {
        // hit faucet
        const coins = yield props.client.getBalance(props.account, config.feeDenom);
        setBalance(coins);
    });
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
