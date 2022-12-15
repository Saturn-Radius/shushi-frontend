import type { AppProps } from 'next/app';
import Header from '../layout/header';
import Footer from '../layout/footer';
import "../styles/globals.css";
import React, { useEffect, useState } from 'react';
import { getAddress } from "../assets/utils/contract";

export const UserContext = React.createContext();



export default function App({ Component, pageProps }: AppProps) {

  const [account, setAccount] = useState("");
  const getInfo = async () => {
    try {
      setTimeout(async ()=>{
        const address = await getAddress();
        setAccount(address);
      }, 2000)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInfo();
  })
  return (
    <>
      <UserContext.Provider value={{ account }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </UserContext.Provider>
    </>
  )
}

