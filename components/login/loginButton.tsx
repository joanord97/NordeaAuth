"use client";
import React from "react";

export const LoginButton = () => {
  const onClick = async (e: any) => {
    const url = "https://api.nordeaopenbanking.com/personal/v5/authorize";

    const state = generateRandomString(16);

    const headers = {
      "x-ibm-client-id": process.env.NEXT_PUBLIC_CLIENT_ID || "",
      //   redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
      state: state,
      "x-ibm-client-secret": process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      signature: "SKIP_SIGNATURE_VALIDATION_FOR_SANDBOX",
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const body = {
      account_list: ["ALL"],
      authentication_method: "BANKID_NO",
      country: "NO",
      duration: 3600,
      language: "en",
      max_th_history: 10,
      redirect_uri:
        "https://developer.nordeaopenbanking.com/console/" +
        process.env.NEXT_PUBLIC_CONSOLE_ID,
      scope: [
        "ACCOUNTS_BALANCES",
        "ACCOUNTS_BASIC",
        "ACCOUNTS_DETAILS",
        "ACCOUNTS_TRANSACTIONS",
        "CARDS_INFORMATION",
        "CARDS_TRANSACTIONS",
        "PAYMENTS_MULTIPLE",
      ],
      state: state,
    };

    const result = await fetch(url, {
      method: "POST",
      redirect: "follow",
      cache: "no-cache",
      headers: headers,
      body: JSON.stringify(body),
    });

    console.log("result", result);
  };

  return <button onClick={onClick}>Login</button>;
};

function generateRandomString(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
