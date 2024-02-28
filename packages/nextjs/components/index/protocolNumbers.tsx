import React, { useEffect, useState } from "react";
import { quoterABI } from "./abis/uniabis";
import { formatEther } from "viem";
import { useContractRead } from "wagmi";

enum FEE_BIPS {
  ONE = 100,
  FIVE = 500,
  THIRTY = 3000,
  HUNDRED = 10000,
}

export function encodePath(path: string[], fees: FEE_BIPS[]) {
  if (path.length != fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }
  const hexStringFees = fees.map(fee => toUint24HexPadded(fee));
  let encoded = "0x";
  for (let i = 0; i < fees.length; i++) {
    encoded += String(path[i]).slice(2);
    encoded += hexStringFees[i];
  }
  encoded += path[path.length - 1].slice(2);
  return encoded.toLowerCase();
}

function toUint24HexPadded(num: number) {
  const hex = num.toString(16);
  return hex.padStart(6, "0");
}

const ProtocolNumbers = () => {
  const path = encodePath(
    [
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    ],
    [FEE_BIPS.FIVE, FEE_BIPS.FIVE],
  );

  const { data: quotedAmountOut } = useContractRead({
    address: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    abi: quoterABI,
    functionName: "quoteExactOutput",
    args: [path, BigInt(1e18).toString()],
    watch: true,
  });

  const [latestPriceNumber, setLatestPriceNumber] = useState<number | null>(null);

  useEffect(() => {
    if (quotedAmountOut) {
      const amount = parseFloat(formatEther(BigInt(quotedAmountOut.toString())));
      setLatestPriceNumber(amount);
    }
  }, [quotedAmountOut]);

  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Precio de 1 Ether</div>
          <div className="stat-value">
            {latestPriceNumber
              ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(latestPriceNumber)
              : "MXN0.00"}
          </div>
          <div className="stat-desc text-base">En pesos $XOC</div>
        </div>
      </div>
    </>
  );
};

export default ProtocolNumbers;
