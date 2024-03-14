import React, { useEffect, useState } from "react";
import Image from "next/image";
import Familia from "../../public/Familia.png";
import heroImg from "../../public/hero-1.png";
import { erc20ABI, houseOfReserveABI } from "../xoc-dapp/abis/xocabis";
import { xocPinABI } from "./abis/xocpin";
import Container from "./container";
import MXNFetch from "./mxnFetch";
import ProtocolNumbers from "./protocolNumbers";
import XOCMinted from "./xocMinted";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDarkMode } from "usehooks-ts";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useBalance, useContractRead, useContractWrite } from "wagmi";
import { swapRouterABI } from "~~/components/index/abis/uniabis";
import { ADDR_LIB, XOC_ADDRESS } from "~~/utils/constants";
import { FEE_BIPS, encodePath } from "~~/utils/scaffold-eth";

const Hero = () => {
  const account = useAccount();
  const [expectedAmountIn, setExpectedAmountIn] = useState<bigint>(0n);
  const { openConnectModal } = useConnectModal();
  const [correctApproval, setCorrectApproval] = useState<boolean>(false);

  const { data: latestPriceData }: { data: bigint | undefined } = useContractRead({
    address: ADDR_LIB.polygon.weth.houseOfReserve, // House of Reserve (WETH)
    abi: houseOfReserveABI,
    functionName: "getLatestPrice",
    watch: true,
  });
  const { data: accountAllowance }: { data: bigint | undefined } = useContractRead({
    address: ADDR_LIB.polygon.weth.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address, ADDR_LIB.polygon.uniswapSwapRouter],
    watch: true,
  });

  const { data: accountXOCAllowance }: { data: bigint | undefined } = useContractRead({
    address: XOC_ADDRESS,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account.address, "0x72fa57b14b83D165EACab4E2bB3B3B9D5B9C5A52"],
    watch: true,
  });

  const xocWethPath = encodePath(
    [XOC_ADDRESS, ADDR_LIB.polygon.usdc.address, ADDR_LIB.polygon.weth.address],
    [FEE_BIPS.FIVE, FEE_BIPS.FIVE],
  );

  const ONE_HUNDRED_XOC = parseEther("100");

  useEffect(() => {
    if (latestPriceData) {
      const scaledLatestPrice = latestPriceData * 10000000000n;
      const slippage = parseEther("0.005");
      const scaleValue = parseEther("1") + slippage;
      setExpectedAmountIn((ONE_HUNDRED_XOC * scaleValue) / scaledLatestPrice);
    }
  }, [latestPriceData, ONE_HUNDRED_XOC]);

  const { data: WETHBalance } = useBalance({
    address: account.address,
    token: ADDR_LIB.polygon.weth.address,
    watch: true,
  });

  const { data: XOCBalance } = useBalance({
    address: account.address,
    token: XOC_ADDRESS,
    watch: true,
  });

  const {
    write: approve,
    isLoading: waitingApproval,
    isSuccess: successfulApproval,
  } = useContractWrite({
    address: ADDR_LIB.polygon.weth.address,
    abi: erc20ABI,
    functionName: "approve",
    args: [ADDR_LIB.polygon.uniswapSwapRouter, expectedAmountIn],
    onSuccess(data) {
      console.log("Success", data);
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const {
    write: executeTrade,
    isError,
    isLoading: waitingTrade,
  } = useContractWrite({
    address: ADDR_LIB.polygon.uniswapSwapRouter,
    abi: swapRouterABI,
    functionName: "exactOutput",
    args: [
      { path: xocWethPath, recipient: account.address, amountOut: ONE_HUNDRED_XOC, amountInMaximum: expectedAmountIn },
    ],
    onSuccess(data) {
      console.log("Success", data);
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const handleBuyXocModal = () => {
    if (account.isDisconnected) {
      // open rainbow kit connect wallet modal
      openConnectModal?.();
    } else {
      // Show buy Xoc modal
      (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
    }
  };

  const { write: approveXOC } = useContractWrite({
    address: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    abi: erc20ABI,
    functionName: "approve",
    args: ["0x72fa57b14b83D165EACab4E2bB3B3B9D5B9C5A52", parseEther("100")],
  });

  const { write: mintNFT } = useContractWrite({
    address: "0x72fa57b14b83D165EACab4E2bB3B3B9D5B9C5A52",
    abi: xocPinABI,
    functionName: "mint",
    args: [account.address],
  });

  useEffect(() => {
    setCorrectApproval((accountAllowance && accountAllowance >= expectedAmountIn) || false);

    console.log("correctApproval", correctApproval);
    console.log("accountAllowance", accountAllowance);
    console.log("expectedAmountIn", expectedAmountIn);
  }, [accountAllowance, expectedAmountIn]);

  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl m-8 text-justify">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-inherit">
              Welcome
              <br /> to Scaffold-XOC
            </h1>
            <h2 className="text-2xl font-semibold leading-normal text-gray-500 lg:text-2xl xl:text-xl dark:text-inherit">
              ¡A decentralized app for Mexico&apos;s #1 decentralized stablecoin!
            </h2>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl dark:text-inherit">
              Scaffold-XOC is an opensource project and this app interface was built using{" "}
              <a
                href="https://scaffoldeth.io/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-green-500 underline"
              >
                Scaffold-Eth-2.
              </a>{" "}
              This app can be run locally in your machine or easily forked to be customized by yourself. It is connected
              connected to the $XOC protocol and it allows minting and burning of the stablecoin through the
              protocol&apos;s House of Reserves contracts.
            </p>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-base  dark:text-inherit">
              Your experience level doesn&apos;t matter! Whether you are a DeFi expert or taking your first steps,
              Scaffold-XOC is here to help you understand and use $XOC in an easy and accessible way. Explore, learn and
              join the decentralized finance revolution with Scaffold-XOC!
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
                onClick={handleBuyXocModal}
              >
                Try $XOC
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col max-h-full max-w-6xl p-10 ">
                  <div className="card-actions justify-end">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-square btn-md btn-ghost mb-5">
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
                    </form>
                  </div>
                  <div className="flex">
                    <div className="card w-96 image-full mr-16">
                      <div className="card-body">
                        <h2 className="card-title text-primary">Buy XOC!</h2>
                        <p className="text-secondary">
                          Buy XOC directly from Uniswap through our Frontend. We make it easy for you by approving the
                          exact amount of WETH that 100$XOC will cost.
                        </p>
                        <div className="flex">
                          <div className="stats stats-vertical shadow" style={{ marginRight: "20px" }}>
                            <div className="stat">
                              <div className="stat-title">Token In</div>
                              <div className="stat-value">
                                {expectedAmountIn ? parseFloat(formatEther(expectedAmountIn)).toFixed(5) : "reading"}
                              </div>
                              <div className="stat-desc">Wrapped Ether</div>
                            </div>
                            <div className="stat">
                              <div className="stat-title">Your Balance</div>
                              <div className="stat-value">
                                {WETHBalance ? parseFloat(formatEther(WETHBalance.value)).toFixed(5) : "reading"}
                              </div>
                              <div className="stat-desc">Wrapped Ether</div>
                            </div>
                          </div>
                          <div className="stats stats-vertical shadow" style={{ marginRight: "20px" }}>
                            <div className="stat">
                              <div className="stat-title">Token Out</div>
                              <div className="stat-value">100</div>
                              <div className="stat-desc">$XOC</div>
                            </div>
                            <div className="stat">
                              <div className="stat-title">Your Balance</div>
                              <div className="stat-value">
                                {XOCBalance ? parseFloat(formatEther(XOCBalance.value)).toFixed(2) : "reading"}
                              </div>
                              <div className="stat-desc">$XOC</div>
                            </div>
                          </div>
                        </div>
                        <div className="card-actions justify-start">
                          <div className="mt-12">
                            <button
                              className={`btn btn-lg mr-5 ${
                                accountAllowance && expectedAmountIn ? " bg-base-100" : ""
                              }`}
                              onClick={correctApproval ? () => executeTrade() : () => approve()}
                            >
                              {correctApproval ? "Execute Trade" : "Approve Weth"}
                            </button>
                            {waitingApproval ||
                              (!correctApproval && successfulApproval && (
                                <span className="loading loading-infinity loading-lg">Waiting</span>
                              ))}
                            {isError && <p className="text-red-500">Error executing trade</p>}
                            {waitingTrade && <p className="text-blue-500">Waiting for trade to execute</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divider divider-horizontal mx-16">
                      <strong>OR</strong>
                    </div>
                    <div className="card bg-base-100 shadow-xl image-full ">
                      <div className="card-body">
                        <h2 className="card-title text-primary">Mint NFT!</h2>
                        <figure>
                          <Image src={Familia} alt="Familia" height={500} width={500} />
                        </figure>
                        <p className="text-secondary">You&apos;ll need 100 $XOC to mint this NFT</p>

                        <div className="card-actions justify-end">
                          <button
                            className={`btn btn-lg mr-5 ${
                              accountXOCAllowance && expectedAmountIn ? " bg-base-100" : ""
                            }`}
                            onClick={
                              accountXOCAllowance && accountXOCAllowance >= expectedAmountIn
                                ? () => mintNFT()
                                : () => approveXOC()
                            }
                          >
                            {accountXOCAllowance && accountXOCAllowance >= expectedAmountIn
                              ? "Mint NFT"
                              : "Approve Minting"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width={950}
              height={950}
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <div className="App">
              <ProtocolNumbers />
            </div>
            <div className="text-xl font-semibold">
              <p>
                Source:{" "}
                <span className=" text-fuchsia-300 decoration-fuchsia-400 decoration-8 font-extrabold">
                  Uniswap V3{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MXNFetch />
            <div className="text-xl font-semibold">
              <p>
                Source:{" "}
                <span className=" text-blue-400 decoration-base-300 decoration-8 font-extrabold">ChainLink </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <XOCMinted />
            <div className="text-xl font-semibold">
              <p>
                Source:{" "}
                <a
                  href="https://polygonscan.com/token/0xa411c9aa00e020e4f88bc19996d29c5b7adb4acf"
                  target="_blank" // Add this attribute
                  rel="noopener noreferrer" // Add these attributes for security reasons
                  className="text-purple-400 decoration-base-300 decoration-8 font-extrabold"
                >
                  Polygonscan
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex flex-col justify-center mt-24 mb-14">
          <div className="text-xl text-center text-inherit dark:text-inherit">
            <h2>
              $XOC is the <span className=" text-green-500">most liquid stablecoin</span> for the MXN currency.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-inherit dark:text-inherit">
              <Image
                src={isDarkMode ? "/ethereumgray.png" : "/ethereum.png"}
                width={200}
                height={100}
                alt="Ethereuem"
              />
            </div>
            <div className="pt-1 text-inherit dark:text-inherit">
              <Image src={isDarkMode ? "/PolygonWhite.png" : "/Polygon.png"} width={200} height={100} alt="Polygon" />
            </div>
            <div className="pt-5 text-inherit dark:text-inherit">
              <Image
                src={isDarkMode ? "/gnosiswhite.png" : "/gnosisblack.png"}
                width={200}
                height={100}
                alt="Gnosis Chain"
              />
            </div>
            <div className="pt-4 text-inherit dark:text-inherit">
              <Image
                src={isDarkMode ? "/optimismwhite.png" : "/optimism.png"}
                width={200}
                height={150}
                alt="Optimism"
              />
            </div>
            <div className="pt-0.5 text-inherit dark:text-inherit">
              <Image
                src={isDarkMode ? "/arbitrumdark.png" : "/arbitrumlight.png"}
                width={200}
                height={150}
                alt="Arbitrum"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
