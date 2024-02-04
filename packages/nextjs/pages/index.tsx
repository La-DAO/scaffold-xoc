/* import Link from "next/link"; */
import { benefitOne, benefitTwo } from "../components/index/data";
import type { NextPage } from "next";

/* import { BanknotesIcon, ChatBubbleLeftRightIcon, PhotoIcon } from "@heroicons/react/24/outline"; */
import { MetaHeader } from "~~/components/MetaHeader";
import Video from "~~/components/index/Video";
import Benefits from "~~/components/index/benefits";
import Cta from "~~/components/index/cta";
import Faq from "~~/components/index/faq";
import Hero from "~~/components/index/hero";
import SectionTitle from "~~/components/index/sectionTitle";
import Testimonials from "~~/components/index/testimonials";

/* import PopUpWidget from "~~/components/index/popupWidget"; */

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <Hero />
      <SectionTitle pretitle="Nextly Benefits" title=" Why should you use this landing page">
        Nextly is a free landing page & marketing website template for startups and indie projects. Its built with
        Next.js & TailwindCSS. And its completely open-source.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle pretitle="Watch a video" title="Learn how to fullfil your needs">
        This section is to highlight a promo or demo video of your product. Analysts says a landing page with video has
        3% more conversion rate. So, don&apos;t forget to add one. Just like this.
      </SectionTitle>
      <Video />
      <SectionTitle pretitle="Testimonials" title="Here's what our customers said">
        Testimonails is a great way to increase the brand trust and awareness. Use this section to highlight your
        popular customers.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Esta sección es para responder preguntas frecuentes de la comunidad emergente alrededor de $XOC y todo ese
        desmadre.
      </SectionTitle>
      <Faq />
      <Cta />

      {/* <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BanknotesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Interact with our smart contracts using the{" "}
                <Link href="/defi" passHref className="link">
                  DeFi
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <PhotoIcon className="h-8 w-8 fill-secondary" />
              <p>
                Coming soon will be our Frontend to interact with{" "}
                <Link href="/" passHref className="link">
                  NFT
                </Link>{" "}
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ChatBubbleLeftRightIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore our{" "}
                <Link
                  href="https://app.daohaus.club/dao/0x89/0xd3f99b1cba012d823c59e3d21bb35acd88e07c58/"
                  passHref
                  className="link"
                  target="_blank"
                >
                  DAO
                </Link>{" "}
                and help us build the future of XOC.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
