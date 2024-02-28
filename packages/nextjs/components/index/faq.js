import React from "react";
import Container from "./container";

const FaqItem = ({ question, answer }) => {
  return (
    <div className="mb-5">
      <details
        open
        className="w-96 bg-base-100 p-4 rounded-xl shadow-md group mx-auto overflow-hidden max-h-[56px] open:!max-h-[400px] transition-[max-height] duration-500"
      >
        <summary className="outline-none cursor-pointer focus:underline focus:text-inherit font-semibold marker:text-inherit group-open:before:rotate-90  before:origin-center relative before:w-[18px] before:h-[18px] before:transition-transform before:duration-200 before:-left-1 before:top-2/4 before:-translate-y-2/4 before:absolute before:bg-no-repeat before:bg-[length:18px_18px] before:bg-center before:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M9%205l7%207-7%207%22%20%2F%3E%0A%3C%2Fsvg%3E')]">
          {question}
        </summary>

        <hr className="my-2 scale-x-150" />

        <div className="text-sm -m-4 -mt-2 p-4 bg-base-100">{answer}</div>
      </details>
    </div>
  );
};

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map(item => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "Como se respalda el valor de cada $XOC?",
    answer:
      "Cada $XOC está respaldado por un token ERC20 en la red de Polygon, Gnosis Chain and Optimism, el cual se puede liquidar por el valor equivalente a la deuda en XOC y saldar la cuenta en el proceso, todo confiando en la red de validadores.",
  },
  {
    question: "Que puedo hacer con $XOC?",
    answer:
      "Puedes usar $XOC para pagar tus deudas, comprar bienes y servicios, o simplemente mantenerlo como una reserva de valor como si fuera cualquier otro peso mexicano. Lo mas impactante que puedes hacer es apoyar a la comunidad de La DAO construyendo el siguiente sistema fincanciero abierto y decentralizado.",
  },
  {
    question: "Quien mantiene todo esto? ",
    answer:
      "Usamos un modelo de negocio por medio una DAO, al momento se llama solo 'La DAO' quien se encarga de gestionar todo el trabajo requerido para construir en DeFi.",
  },
  {
    question: "Como me involucro? ",
    answer:
      "Puedes comprar $XOC en cualquier exchange que lo ofrezca, o puedes participar en la DAO y ayudar a construir el futuro de las finanzas descentralizadas. Si tienes alguna habilidad que creas que pueda ser útil, no dudes en contactarnos.",
  },
];

export default Faq;
