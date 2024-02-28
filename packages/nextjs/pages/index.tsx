import Image from "next/image";
import { benefitOne, benefitTwo } from "../components/index/data";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Benefits from "~~/components/index/benefits";
import Cta from "~~/components/index/cta";
import Faq from "~~/components/index/faq";
import Hero from "~~/components/index/hero";
import SectionTitle from "~~/components/index/sectionTitle";
import Testimonials from "~~/components/index/testimonials";
import grow from "~~/public/grow.png";

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
    </>
  );
};

export default Home;
