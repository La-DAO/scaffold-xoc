import React from "react";
// import { EtherInput } from "../scaffold-eth";
// import Button3D from "./Button3D";
import { approveABI, houseOfReserveABI } from "./abis/xocabis";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

interface AmountInputProps {
  headerText: string;
  inputAmount?: string;
  inputError: any;
  inputAmountBigNum: any;
  inputLimit: any;
  inputTypeText: any;
  actionText: string;
  actionHandler?: () => void;
  value: any;
  onChangeInput: React.Dispatch<React.SetStateAction<any>>;
}

export default function AmountInput({
  actionText,
  value,
  onChangeInput,
  actionHandler,
}: AmountInputProps): JSX.Element {
  // Initialize the amount state with the value from the inputAmount prop

  // Write to the contract using the useScaffoldContractWrite hook
  /*   const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
    abi: wagmigotchiABI,
    functionName: "deposit",
  }) */
  // Write to the contract using the useScaffoldContractWrite hook
  const {data, isLoading, isSuccess } = useContractWrite({
    address: "0x09dFC327364701d73683aCe049B8A5a8Ea27F3E8",
    abi: houseOfReserveABI,
    functionName: "deposit",
    args: [value],
  });

  const { write: approveWrite } = useContractWrite({
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    abi: approveABI,
    functionName: "approve",
    args: ["0xd411BE9A105Ea7701FabBe58C2834b7033EBC203", parseEther("1")],
  });

  // Update the component state when the inputAmount prop changes
  /* useEffect(() => {
    onChangeInput(inputAmount || "");
  }, [inputAmount]); */

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      console.log("valid");
      onChangeInput(input);
    } else {
      console.log("invalid");
    }

    // If input is a valid number, parse it to BigInt
    /*
    const newAmount = !isNaN(Number(input))
      ? BigInt(parseFloat(input).toFixed(0))
      : input.includes(".")
      ? BigInt(0) // or handle the dot as needed
      : BigInt(0);
      */

    // const newAmount = input === "" ? BigInt(0) : !isNaN(Number(input)) ? BigInt(parseFloat(input)) : BigInt(0);
  };

  /*   const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending amount: ', amount);
    // Call the write function with the amount state
    await write(amount);

  }; */

  return (
    <form className="p-10 pt-36 flex flex-col items-center border-r-2">
      <div className="relative p-10">
        {/*<EtherInput value={amount} onChange={setAmount} />*/}
        <input
          type="search"
          id="search"
          className="text-5xl block p-4 pl-10 text-gray-900 border-b-4 rounded-lg bg-inherit focus:ring-blue-500 focus:border-white dark:bg-inherit dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Amount"
          required
          // Set the inputAmount prop as the input value
          value={value.toString()}
          onChange={handleAmountChange}
        />
      </div>
      <div className="">
        <button onClick={actionHandler} className="btn btn-primary">
          {actionText}
        </button>

        <button onClick={() => approveWrite()} className="btn btn-primary">
          approve
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </form>
  );
}
