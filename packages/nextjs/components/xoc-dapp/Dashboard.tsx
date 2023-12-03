import React from "react";
import { useState } from "react";
import AmountInput from "./AmountInput";
// import CollateralInfo from "./CollateralInfo";
import PillNavigation from "./PillNavigation";
import { parseEther } from "viem";
import {
  useScaffoldContractRead,
  /* useScaffoldContractWrite */
} from "~~/hooks/scaffold-eth";
import { houseOfReserveABI, houseOfCoinABI } from "./abis/xocabis";
import { useContractWrite } from "wagmi";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("deposit");
  const isNative = true; // Define or retrieve isNative
  const CollateralDepositInputAmount = "0"; // Define or retrieve CollateralDepositInputAmount
  const CollateralDepositInputError = ""; // Define or retrieve CollateralDepositInputError
  const CollateralDepositInputAmountBigNum = undefined; // Define or retrieve CollateralDepositInputAmountBigNum
  const userNativeTokenBalance = null; // Define or retrieve userNativeTokenBalance
  // const userCollateralAllowance = null; // Define or retrieve userCollateralAllowance
  const userCollateralBalance = null; // Define or retrieve userCollateralBalance
  const XOCMintInputAmount = "0"; // Define or retrieve XOCMintInputAmount
  const XOCMintInputError = ""; // Define or retrieve XOCMintInputError
  const XOCMintInputAmountBigNum = undefined; // Define or retrieve XOCMintInputAmountBigNum
  const userXOCMintingPower = null; // Define or retrieve userXOCMintingPower
  const XOCRedeemInputAmount = "0"; // Define or retrieve XOCRedeemInputAmount
  const XOCRedeemInputError = ""; // Define or retrieve XOCRedeemInputError
  const XOCRedeemInputAmountBigNum = undefined; // Define or retrieve XOCRedeemInputAmountBigNum

  const userXOCDebt = null; // Define or retrieve userXOCDebt
  const WETHWithdrawInputAmount = "0"; // Define or retrieve WETHWithdrawInputAmount
  const WETHWithdrawInputError = ""; // Define or retrieve WETHWithdrawInputError
  const WETHWithdrawInputAmountBigNum = undefined; // Define or retrieve WETHWithdrawInputAmountBigNum
  const userCollateralMaxWithdrawal = null; // Define or retrieve userCollateralMaxWithdrawal
  const { data: userXOCBalance } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const [deposit, setDeposit] = useState<string>("");
  const [mint, setMint] = useState<string>("");
  const [redeem, setRedeem] = useState<string>("");
  const [withdraw, setWithdraw] = useState<string>("");

  const { write: depositWETH } = useContractWrite({
    address: "0x09dFC327364701d73683aCe049B8A5a8Ea27F3E8",
    abi: houseOfReserveABI,
    functionName: "deposit",
    args: [parseEther(deposit)],
  });

  const { write: mintXOC } = useContractWrite({
    address: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
    abi: houseOfCoinABI,
    functionName: "mintCoin",
    args: [
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
      parseEther(mint),
    ],
  });

  const { write: withdrawWETH } = useContractWrite({
    address: "0x09dFC327364701d73683aCe049B8A5a8Ea27F3E8",
    abi: houseOfReserveABI,
    functionName: "withdraw",
    args: [parseEther(withdraw)],
  });

  return (
    <div className="wrapper">
      <PillNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>{userXOCBalance}</div>
      <div className="main-section">
        <div className="input-section">
          <div className="input-section__container">
            {selectedTab === "deposit" ? (
              isNative ? (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userNativeTokenBalance}
                  inputTypeText="Collateral"
                  actionText="Deposit"
                  onChangeInput={setDeposit}
                  value={deposit}
                  actionHandler={depositWETH}
                />
              ) : // ) : checkNeedsAllowance(CollateralDepositInputAmountBigNum, get(userCollateralAllowance)) ? (
              true === true ? (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userCollateralBalance}
                  inputTypeText="Collateral"
                  actionText="Approve"
                  onChangeInput={setDeposit}
                  value={deposit}
                />
              ) : (
                <AmountInput
                  headerText="Deposit"
                  inputAmount={CollateralDepositInputAmount}
                  inputError={CollateralDepositInputError}
                  inputAmountBigNum={CollateralDepositInputAmountBigNum}
                  inputLimit={userCollateralBalance}
                  inputTypeText="Collateral"
                  actionText="Deposit"
                  onChangeInput={setDeposit}
                  value={deposit}
                />
              )
            ) : selectedTab === "mint" ? (
              <AmountInput
                headerText="Mint"
                inputAmount={XOCMintInputAmount}
                inputError={XOCMintInputError}
                inputAmountBigNum={XOCMintInputAmountBigNum}
                inputLimit={userXOCMintingPower}
                inputTypeText="Token Mint"
                actionText="Mint"
                onChangeInput={setMint}
                value={mint}
                actionHandler={mintXOC}
              />
            ) : selectedTab === "redeem" ? (
              <AmountInput
                headerText="Redeem"
                inputAmount={XOCRedeemInputAmount}
                inputError={XOCRedeemInputError}
                inputAmountBigNum={XOCRedeemInputAmountBigNum}
                inputLimit={userXOCBalance?.gt(userXOCDebt ? userXOCDebt : 0) ? userXOCDebt : userXOCBalance}
                inputTypeText="Token Redeem"
                actionText="Redeem"
                onChangeInput={setRedeem}
                value={redeem}
              />
            ) : selectedTab === "withdraw" ? (
              <AmountInput
                headerText="Withdraw"
                inputAmount={WETHWithdrawInputAmount}
                inputError={WETHWithdrawInputError}
                inputAmountBigNum={WETHWithdrawInputAmountBigNum}
                inputLimit={userCollateralMaxWithdrawal}
                inputTypeText="Collateral"
                actionText="Withdraw"
                onChangeInput={setWithdraw}
                value={withdraw}
                actionHandler={withdrawWETH}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
