import { MetaHeader } from "../components/MetaHeader";
import type { NextPage } from "next";
import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import FlowingBalance from "~~/components/streams/FlowingBalance";
import SuperTokens from "~~/components/streams/SuperTokens";
import { CFAv1ForwarderABI } from "~~/components/streams/abis/CFAv1Forwarder";
import { SuperTokenABI } from "~~/components/streams/abis/SuperTokenABI";

const Streams: NextPage = () => {
  const account = useAccount();

  const { data: balanceOf } = useContractRead({
    address: "0x36d9a149895d905D117C38F3090f4344B76Ec9F4",
    abi: SuperTokenABI,
    functionName: "balanceOf",
    args: [account.address],
  });

  console.log(balanceOf);

  const { data: getAccountFlowrate } = useContractRead({
    address: "0xcfA132E353cB4E398080B9700609bb008eceB125",
    abi: CFAv1ForwarderABI,
    functionName: "getAccountFlowrate",
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", account.address],
  });

  return (
    <>
      <MetaHeader title="XocDapp | Wagmi" description="XocDapp page" />
      <div className="flex flex-col m-10 p-20 items-center ">
        <SuperTokens />
        <div className="card w-3/5 bg-base-100 shadow-xl mt-16">
          <div className="card-body">
            <div className="stat-title">Account&apos;s Flowrate</div>
            <FlowingBalance
              startingBalance={BigInt(balanceOf?.toString() ?? "0")}
              startingBalanceDate={new Date()}
              flowRate={BigInt(getAccountFlowrate?.toString() ?? "0")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Streams;
