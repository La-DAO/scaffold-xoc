import React from "react";
// import { EtherInput } from "../scaffold-eth";
// import Button3D from "./Button3D";
import { approveABI } from "./abis/xocabis";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

interface AmountInputProps {
  headerText: string;
  actionText: string;
  actionHandler?: () => void;
  value: any;
  onChangeInput: React.Dispatch<React.SetStateAction<any>>;
  isError: boolean;
  isLoading: boolean;
}

export default function AmountInput({
  actionText,
  value,
  onChangeInput,
  actionHandler,
}: AmountInputProps): JSX.Element {
  const { write: approveWrite } = useContractWrite({
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    abi: approveABI,
    functionName: "approve",
    args: ["0xd411BE9A105Ea7701FabBe58C2834b7033EBC203", parseEther("1")],
  });

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      console.log("valid");
      onChangeInput(input);
    } else {
      console.log("invalid");
    }
  };

  return (
    <form className="p-10 pt-36 flex flex-col items-center">
      <div className="relative p-10">
        <input
          type="search"
          id="search"
          className="text-5xl block p-4 pl-10 text-center text-gray-900 border-b-4 rounded-lg bg-inherit  focus:border-bg-base-300 dark:bg-inherit dark:border-bg-base-100 dark:placeholder-bg-base-100 dark:border-bg-base-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-600"
          placeholder="Enter Amount"
          required
          // Set the inputAmount prop as the input value
          value={value.toString()}
          onChange={handleAmountChange}
          autoComplete="off"
        />
      </div>
      <div className="">
        <button type="button" onClick={actionHandler} className="btn btn-primary dark:bg-base-100">
          {actionText}
        </button>

        <button onClick={() => approveWrite()} className="btn btn-primary dark:bg-base-100">
          approve
        </button>
      </div>
    </form>
  );
}
