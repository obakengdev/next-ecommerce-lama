"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

export const WixClient = createClient({
  modules: {
    products,
    collections,
  },
  auth: OAuthStrategy({
    clientId: "",
    tokens: {
      refreshToken,
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    },
  }),
});

// const productList = await myWixClient.products.queryProducts().find();

// console.log("My Products:");
// console.log("Total: ", productList.items.length);
// console.log(productList.items.map((item) => item.name).join("\n"));

// uncomment this
// export type WixClient = typeof wixClient;

// export const WixClientContext = createContext<WixClient>(wixClient);

// export const WixClientContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   return (
//     <WixClientContext.Provider value={wixClient}>
//       {children}
//     </WixClientContext.Provider>
//   );
// };
