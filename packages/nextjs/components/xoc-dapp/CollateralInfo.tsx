import React, { useEffect, useState } from "react";
import { assetsAccountantABI, houseOfCoinABI, houseOfReserveABI } from "./abis/xocabis";
import { formatEther } from "viem";
import { useAccount, useBalance, useContractRead } from "wagmi";

const CollateralInfo = () => {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
    token: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    watch: true,
  });

  const { data: mintingPowerData } = useContractRead({
    address: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
    abi: houseOfCoinABI,
    functionName: "checkRemainingMintingPower",
    args: [address, "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203"],
  });

  const { data: latestPriceData } = useContractRead({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203", //House of Reserve (WETH)
    abi: houseOfReserveABI,
    functionName: "getLatestPrice",
    watch: true,
  });

  const { data: checkMaxWithdrawalData } = useContractRead({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203", //House of Reserve (WETH)
    abi: houseOfReserveABI,
    functionName: "checkMaxWithdrawal",
    args: [address],
    watch: true,
  });

  const { data: computeUserHealthRatioData } = useContractRead({
    address: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B", //House of Coin (WETH)
    abi: houseOfCoinABI,
    functionName: "computeUserHealthRatio",
    args: [address, "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203"],
    watch: true,
  });

  const { data: reserveTokenData } = useContractRead({
    address: "0xB90996A70C957a1496e349434CF0E030A9f693A4", // AssetsAccountant
    abi: assetsAccountantABI, // ABI of the contract
    functionName: "balanceOf", // Function name to call
    args: [address, "11947586584348366889623359790458925956500907418440056359644468546038903560217"], // Arguments to pass to the function
  });

  const [balance, setBalance] = useState<any>(null);
  const [mintingPower, setMintingPower] = useState<any>(null);
  const [latestPrice, setLatestPrice] = useState<any>(null);
  const [checkMaxWithdrawal, setCheckMaxWithdrawal] = useState<any>(null);
  const [computeUserHealthRatio, setComputeUserHealthRatio] = useState<any>(null);
  const [reserveToken, setReserveToken] = useState<any>(null);
  const [latestPriceNumber, setLatestPriceNumber] = useState<number | bigint | any>(null);

  useEffect(() => {
    if (reserveTokenData) {
      setReserveToken(reserveTokenData);
    }
  }, [reserveTokenData]);

  useEffect(() => {
    if (computeUserHealthRatioData) {
      setComputeUserHealthRatio(computeUserHealthRatioData);
    }
  }, [computeUserHealthRatioData]);

  useEffect(() => {
    if (checkMaxWithdrawalData) {
      setCheckMaxWithdrawal(checkMaxWithdrawalData);
    }
  }, [checkMaxWithdrawalData]);

  useEffect(() => {
    if (latestPriceData) {
      setLatestPrice(latestPriceData);
    }
  }, [latestPriceData]);

  useEffect(() => {
    if (latestPrice) {
      setLatestPriceNumber(parseFloat(formatEther(BigInt(latestPrice?.toString() + "1000000000"))).toFixed(2));
    }
  }, [latestPrice]);

  useEffect(() => {
    if (mintingPowerData) {
      setMintingPower(mintingPowerData);
    }
  }, [mintingPowerData]);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData);
    }
  }, [balanceData]);

  return (
    <div className="flex flex-col max-w-sm mx-auto my-auto">
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 border-r border-primary flex items-end">Reserve Balance</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(BigInt(reserveToken?.toString() ?? "0"))).toFixed(5)} WETH
        </div>
      </div>
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 bg-base-300 border-r border-primary flex items-end">Total Minting Power</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(BigInt(mintingPower?.toString() ?? "0"))).toFixed(2)} XOC
        </div>
      </div>
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 border-r border-primary flex items-end">Latest Price</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {latestPriceNumber &&
            new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(latestPriceNumber)}
          MXN
        </div>
      </div>
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 bg-base-300 border-r border-primary flex items-end">User Balance</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {balance?.formatted} XOC
        </div>
      </div>
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 border-r border-primary flex items-end">Max Withdrawal</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(checkMaxWithdrawal?.toString() ?? 0)).toFixed(5)} WETH
        </div>
      </div>
      <div className="bg-secondary border border-primary rounded-xl flex">
        <div className="p-2 py-1 bg-base-300 border-r border-primary flex items-end">User Health Ratio</div>
        <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(computeUserHealthRatio?.toString() ?? 0)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CollateralInfo;
