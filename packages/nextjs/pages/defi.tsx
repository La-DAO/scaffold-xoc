import { MetaHeader } from "../components/MetaHeader";
import Dashboard from "../components/xoc-dapp/Dashboard";
import type { NextPage } from "next";

const Defi: NextPage = () => {
  return (
    <>
      <MetaHeader title="XocDapp | Wagmi" description="XocDapp page" />
      <Dashboard />
    </>
  );
};

export default Defi;
