import React, { useEffect, useState } from "react";
import { quoterABI } from "./abis/uniabis";
import { formatEther } from "viem";
import { useContractRead } from "wagmi";
import { ADDR_LIB, XOC_ADDRESS } from "~~/utils/constants";
import { FEE_BIPS, encodePath } from "~~/utils/scaffold-eth";

const ProtocolNumbers = () => {
  const path = encodePath(
    [ADDR_LIB.polygon.weth.address, ADDR_LIB.polygon.usdc.address, XOC_ADDRESS],
    [FEE_BIPS.FIVE, FEE_BIPS.FIVE],
  );

  const { data: quotedAmountOut } = useContractRead({
    address: ADDR_LIB.polygon.uniswapQuoter,
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
