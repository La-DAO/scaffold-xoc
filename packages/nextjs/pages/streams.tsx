import { MetaHeader } from "../components/MetaHeader";
import type { NextPage } from "next";
import SuperTokens from "~~/components/streams/SuperTokens";

const Streams: NextPage = () => {
  return (
    <>
      <MetaHeader title="XocDapp | Wagmi" description="XocDapp page" />
      <SuperTokens />
    </>
  );
};

export default Streams;
