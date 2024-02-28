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
      <SectionTitle pretitle="Beneficios de $XOC" title="¿Por qué adoptar un peso digital?">
        $XOC te abre las puertas a la creciente comunidad de Web3, tanto en México como en el mundo. Descubre los
        múltiples beneficios que ofrece:
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      {/*       <SectionTitle pretitle="¡Mira el Video!" title="Sumérgete en el mundo de $XOC">
        <div>
          <p>¿Te preguntas cómo se lleva a cabo la magia de $XOC? ¿Quieres entender cómo funciona este innovador protocolo y cómo puedes comenzar a usarlo? ¡No busques más! Te presentamos un video que te llevará paso a paso a través del fascinante mundo de $XOC.</p>
      
          <h2>Descubre la magia de $XOC:</h2>
          
          <ul>
            <li>Aprende cómo funciona el protocolo.</li>
            <li>Descubre las posibilidades que ofrece.</li>
            <li>Prepárate para ser parte de la revolución financiera.</li>
            <li>¡Prepárate para una experiencia visual que te dejará con ganas de más!</li>
          </ul>
        </div>
      </SectionTitle> */}
      <div className="divider"></div>
      <SectionTitle pretitle="¡Testimonios que inspiran!" title="Descubre las voces de la comunidad $XOC">
        Descubre los testimonios auténticos de aquellos que forman parte de la vibrante comunidad que está construyendo
        y utilizando $XOC. Desde experiencias transformadoras hasta historias de éxito, aquí encontrarás la inspiración
        que necesitas para unirte a esta emocionante revolución financiera.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Preguntas Frecuentes">
        Esta sección es para responder preguntas frecuentes de la comunidad emergente alrededor de $XOC y todo ese
        desmadre.
      </SectionTitle>
      <Faq />
      <Cta />
    </>
  );
};

export default Home;
