import React from "react";
import Image from "next/image";
import userOneImg from "../../public/user1.jpg";
import userTwoImg from "../../public/user2.jpg";
import userThreeImg from "../../public/user3.jpg";
import Container from "./container";

const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-base-300 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal dark:text-inherit">
              $XOC revolucionó mi desarrollo financiero. Rápido, seguro y empoderador. <Mark>Gracias</Mark> por abrir
              posibilidades.
            </p>

            <Avatar image={userOneImg} name="Luna Perez" title="VP Sales - Bachoco" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-base-300 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal dark:text-inherit">
              Con $XOC, las transacciones son rápidas y seguras. Me siento parte de una <Mark>comunidad sólida</Mark>.
            </p>

            <Avatar image={userTwoImg} name="Brian Flores" title="Lead marketer en FEMSA" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-base-300 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal text-inherit dark:text-inherit">
              $XOC <Mark>simplifica</Mark> mis transacciones. Empoderamiento financiero y acceso a DeFi. ¡Gracias por la revolución!
            </p>

            <Avatar image={userThreeImg} name="Gabriel Guzman" title="Co-Founder de Mercado Libre" />
          </div>
        </div>
      </div>
    </Container>
  );
};

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image src={props.image} width="40" height="40" alt="Avatar" placeholder="blur" />
      </div>
      <div>
        <div className="text-lg font-medium dark:text-inherit">{props.name}</div>
        <div className="text-inherit dark:text-inherit">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}

export default Testimonials;
