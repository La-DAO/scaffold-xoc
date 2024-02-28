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
    args: ["0x2c6dAB164dB072a8E2163fc5A547F229dc185C9f", approveAmount],
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
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", receiverAddress, BigInt(100)],
  });

  const { write: deleteFlow } = useContractWrite({
    address: "0xcfA132E353cB4E398080B9700609bb008eceB125",
    abi: CFAv1ForwarderABI,
    functionName: "deleteFlow",
    args: ["0x36d9a149895d905D117C38F3090f4344B76Ec9F4", address, deleteAddress, "0x0"],
  });

  return (
    <>
      <div>
        <h1>Approve Upgrade</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={approveAmount}
          onChange={e => setApproveAmount(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => approveUpgrade()}>
          Approve Upgrade
        </button>
      </div>
      <div>
        <h1>Upgrade</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={upgradeAmount}
          onChange={e => setUpgradeAmount(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => upgrade()}>
          Upgrade
        </button>
      </div>
      <div>
        <h1>Downgrade</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={downgradeAmount}
          onChange={e => setDowngradeAmount(e.target.value)}
        />
        <button className="btn btn-error" onClick={() => downgrade()}>
          Downgrade
        </button>
      </div>
      <div>
        <h1>Set Flowrate</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={receiverAddress}
          onChange={e => setReceiverAddress(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => forwarder()}>
          Set Flowrate
        </button>
      </div>
      <div>
        <h1>Delete Flowrate</h1>
        <input
          type="text"
          placeholder="Type receiver address"
          className="input input-bordered w-full max-w-xs"
          value={deleteAddress}
          onChange={e => setDeleteAddress(e.target.value)}
        />
        <button className="btn btn-error" onClick={() => deleteFlow()}>
          Delete Flowrate
        </button>
      </div>
    </>
  );
};

export default SupertokensComponent;
