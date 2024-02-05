/* import Link from "next/link"; */
import Image from "next/image";
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
import grow from "~~/public/grow.png";

/* import PopUpWidget from "~~/components/index/popupWidget"; */

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <Hero />
      <div className="flex items-center justify-center w-full h-screen">
        <div className="">
          <Image
            src={grow}
            width="950"
            height="950"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
      <SectionTitle pretitle="Beneficios de $XOC" title=" Para que empezar usar un peso digital">
        El uso de $XOC es la unica forma de integrarte a la comunidad emergente Web3 que estar creciendo en México y el
        mundo. Aquí te dejamos algunos beneficios de usar $XOC.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle pretitle="Wacha el video" title="Aprende como sucede la magia">
        Aprende como funciona la magia de $XOC y como puedes empezar a usarlo. Aquí te dejamos un video para que te des
        una idea de como funciona el protocolo y donde queda mas trabajo por hacer.
      </SectionTitle>
      <Video />
      <SectionTitle pretitle="Testimonios" title="Aqui esta lo que dice la raza de $XOC">
        Aqui te dejamos algunos testimonios de la comunidad emergente que esta construyendo y ya esta usando $XOC y como
        les ha cambiado la vida.
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
