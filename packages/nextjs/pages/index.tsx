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
      <SectionTitle pretitle="Why adopt a digital peso?" title="Benefits of $XOC">
        $XOC opens the doors to the thriving Web3 community, both in Mexico and around the world. Explore the numerous
        benefits it offers:
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
      <SectionTitle pretitle="¡Inspiring testimonials!" title="Explore the voices of the $XOC community">
        Discover authentic testimonials from those who are part of the vibrant community building and using $XOC. From
        transformative experiences to success stories, here you&apos;ll find the inspiration you need to join this
        exciting financial revolution.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        This section is for answering frequently asked questions from the emerging community around $XOC and all that
        jazz.
      </SectionTitle>
      <Faq />
      <Cta />
    </>
  );
};

export default Home;
