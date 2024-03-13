import React, { useState } from "react";
import { xocolatlABI } from "../xoc-dapp/abis/xocabis";
import { CFAv1ForwarderABI } from "./abis/CFAv1Forwarder";
import { SuperTokenABI } from "./abis/SuperTokenABI";
import { useAccount } from "wagmi";
import { useContractWrite } from "wagmi";

const SupertokensComponent: React.FC = () => {
  const { address } = useAccount();
  const [approveAmount, setApproveAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [deleteAddress, setDeleteAddress] = useState("");
  const [upgradeAmount, setUpgradeAmount] = useState("");
  const [downgradeAmount, setDowngradeAmount] = useState("");

  const { write: approveUpgrade } = useContractWrite({
    address: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
    abi: xocolatlABI,
    functionName: "approve",
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", approveAmount],
  });

  const { write: upgrade } = useContractWrite({
    address: "0x36d9a149895d905D117C38F3090f4344B76Ec9F4",
    abi: SuperTokenABI,
    functionName: "upgrade",
    args: [upgradeAmount],
  });

  const { write: downgrade } = useContractWrite({
    address: "0x36d9a149895d905D117C38F3090f4344B76Ec9F4",
    abi: SuperTokenABI,
    functionName: "downgrade",
    args: [downgradeAmount],
  });

  const { write: forwarder } = useContractWrite({
    address: "0xcfA132E353cB4E398080B9700609bb008eceB125",
    abi: CFAv1ForwarderABI,
    functionName: "setFlowrate",
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", receiverAddress, BigInt(100000000000000)],
  });

  const { write: deleteFlow } = useContractWrite({
    address: "0xcfA132E353cB4E398080B9700609bb008eceB125",
    abi: CFAv1ForwarderABI,
    functionName: "deleteFlow",
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", address, deleteAddress, "0x0"],
  });

  return (
    <>
      {/* Top section */}
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <h1>Approve Upgrade</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={approveAmount}
            onChange={e => setApproveAmount(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={() => approveUpgrade()}>
            Approve Upgrade
          </button>
        </div>
        <div className="text-center">
          <h1>Upgrade</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={upgradeAmount}
            onChange={e => setUpgradeAmount(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={() => upgrade()}>
            Upgrade
          </button>
        </div>
        <div className="text-center">
          <h1>Downgrade</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={downgradeAmount}
            onChange={e => setDowngradeAmount(e.target.value)}
          />
          <button className="btn btn-error mt-2" onClick={() => downgrade()}>
            Downgrade
          </button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-center space-x-8">
        <div className="text-center">
          <h1>Set Flowrate</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={receiverAddress}
            onChange={e => setReceiverAddress(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={() => forwarder()}>
            Set Flowrate
          </button>
        </div>
        <div className="text-center">
          <h1>Delete Flowrate</h1>
          <input
            type="text"
            placeholder="Type receiver address"
            className="input input-bordered w-full max-w-xs"
            value={deleteAddress}
            onChange={e => setDeleteAddress(e.target.value)}
          />
          <button className="btn btn-error mt-2" onClick={() => deleteFlow()}>
            Delete Flowrate
          </button>
        </div>
      </div>
    </>
  );
};

export default SupertokensComponent;
