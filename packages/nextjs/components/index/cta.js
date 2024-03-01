import React, { useState } from "react";
import Image from "next/image";
import { xocolatlABI } from "../xoc-dapp/abis/xocabis";
import { xocPinABI } from "./abis/xocpin";
import Container from "./container";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { useAccount } from "wagmi";

const Cta = () => {
  const [showCard, setShowCard] = useState(false);
  const account = useAccount();

  const handleButtonClick = () => {
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  const { write: approve } = useContractWrite({
    address: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    abi: xocolatlABI,
    functionName: "approve",
    args: ["0x72fa57b14b83D165EACab4E2bB3B3B9D5B9C5A52", parseEther("100")],
  });

  const { write: mintNFT } = useContractWrite({
    address: "0x72fa57b14b83D165EACab4E2bB3B3B9D5B9C5A52",
    abi: xocPinABI,
    functionName: "mint",
    args: [account.address],
  });

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">Listo para unirte a la aventura?</h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            No dejes pasar la oportunidad de aportar!
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <button
            onClick={handleButtonClick}
            className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 bg-white rounded-md px-7 lg:px-10 lg:py-5"
          >
            Mintea tu NFT de membresía
          </button>
        </div>
      </div>
      {showCard && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 shadow-xl p-8 rounded-lg z-10 max-w-screen-lg w-full ">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm" onClick={handleCloseCard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" />
            </figure>
            <div className="card-body">
              <div className="stats stats-vertical lg:stats-horizontal shadow mb-5">
                <div className="stat">
                  <div className="stat-title">Price to Mint</div>
                  <div className="stat-value">100 $XOC</div>
                  <div className="stat-desc">First Come, First Served</div>
                </div>
                <div className="stat">
                  <div className="stat-title">NFTs Minted</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
              </div>
              <div className="card-actions justify-center">
                <button onClick={approve} className="btn btn-warning">
                  Approve 100 $XOC
                </button>
                <div className="card-actions justify-end">
                  <button onClick={mintNFT} className="btn btn-primary">
                    Mint NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cta;
