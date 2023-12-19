import React from "react";
import { useState } from "react";
import AmountInput from "./AmountInput";
import CollateralInfo from "./CollateralInfo";
import PillNavigation from "./PillNavigation";
import { houseOfCoinABI, houseOfReserveABI } from "./abis/xocabis";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("deposit");
  const [deposit, setDeposit] = useState<string>("");
  const [mint, setMint] = useState<string>("");
  const [redeem, setRedeem] = useState<string>("");
  const [withdraw, setWithdraw] = useState<string>("");

  const {
    write: depositWETH,
    isError: depositError,
    isLoading: depositLoading,
  } = useContractWrite({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
    abi: houseOfReserveABI,
    functionName: "deposit",
    args: [parseEther(deposit)],
  });

  const {
    write: mintXOC,
    isError: mintingError,
    isLoading: mintingLoading,
  } = useContractWrite({
    address: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
    abi: houseOfCoinABI,
    functionName: "mintCoin",
    args: [
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
      parseEther(mint),
    ],
  });

  const {
    write: redeemXOC,
    isError: redeemError,
    isLoading: redeemLoading,
  } = useContractWrite({
    address: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
    abi: houseOfCoinABI,
    functionName: "paybackCoin",
    args: ["70972479931534892086591623403426119776171689317875217451089907405265175126937", parseEther(redeem)],
  });

  const {
    write: withdrawWETH,
    isError: withdrawError,
    isLoading: withdrawLoading,
  } = useContractWrite({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
    abi: houseOfReserveABI,
    functionName: "withdraw",
    args: [parseEther(withdraw)],
  });

  return (
    <div className="wrapper">
      <PillNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="main-section">
        <div className="input-section">
          <div className="input-section__container">
            {selectedTab === "deposit" && (
              <AmountInput
                headerText="Deposit"
                actionText="Deposit"
                onChangeInput={setDeposit}
                value={deposit}
                actionHandler={depositWETH}
                isError={depositError}
                isLoading={depositLoading}
              />
            )}
            {selectedTab === "mint" && (
              <AmountInput
                headerText="Mint"
                actionText="Mint"
                onChangeInput={setMint}
                value={mint}
                actionHandler={mintXOC}
                isError={mintingError}
                isLoading={mintingLoading}
              />
            )}
            {selectedTab === "redeem" && (
              <AmountInput
                headerText="Redeem"
                actionText="Redeem"
                onChangeInput={setRedeem}
                value={redeem}
                actionHandler={redeemXOC}
                isError={redeemError}
                isLoading={redeemLoading}
              />
            )}
            {selectedTab === "withdraw" && (
              <AmountInput
                headerText="Withdraw"
                actionText="Withdraw"
                onChangeInput={setWithdraw}
                value={withdraw}
                actionHandler={withdrawWETH}
                isError={withdrawError}
                isLoading={withdrawLoading}
              />
            )}
            {(depositError || depositLoading) && <div>Hello!!!</div>}
            {(mintingError || mintingLoading) && <div>Hello!!!</div>}
            {redeemError && <div>Hello!!!</div>}
            {redeemLoading && (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Loading!</h2>
                  <p>If a transaction goes to the mempool, you ahve to wait!</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            )}
            {withdrawError && withdrawLoading && <div>Hello!!!</div>}
          </div>
          <CollateralInfo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
