import Hero from "@/components/Hero";
import { GoCheckCircle } from "react-icons/go";

export default function Home() {
  return (
    <main>
      <Hero />

      {/*  Demjleg */}

      <div className=" mx-auto max-w-7xl  bg-white text-center ">
        <h2 className="text-gray-500 text-3xl">Дэмжлэг</h2>
        <h2
          data-v-050291cb=""
          className="max-w-xl mx-auto text-6xl font-bold mt-4 mb-6 xs:text-2xl xs:mt-2 xs:mb-2"
        >
          Give your audience an easy way to say thanks.
        </h2>
        <h3 className=" text-xl max-w-2xl mx-auto my-6 xs:text-base xs:mb-2">
          Buy Me a Coffee makes supporting fun and easy. In just a couple of
          taps, your fans can make the payment (buy you a coffee) and leave a
          message.
        </h3>
      </div>

      {/* Designed for creators */}

      <div className="container mx-auto text-center my-16">
        <h2 className="max-w-2xl mx-auto text-6xl font-bold mt-4 mb-6 xs:text-2xl xs:mt-2 xs:mb-2">
          Designed for creators, not for businesses.
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 mt-12 xs:grid-cols-1">
          <div className="flex">
            <div className="mt-2">
              <GoCheckCircle className="text-3xl text-green-500" />
            </div>
            <div className="text-left ml-4 text-xl">
              We don&apos;t call them &quot;customers&quot; or transactions.
              They are your supporters.
            </div>
          </div>
          <div className="flex">
            <div className="mt-2">
              <GoCheckCircle className="text-3xl text-green-500" />
            </div>
            <div className="text-left ml-4 text-xl">
              No subscriptions or monthly fees. Keep what you earn.
            </div>
          </div>
          <div className="flex">
            <div className="mt-2">
              <GoCheckCircle className="text-3xl text-green-500" />
            </div>
            <div className="text-left ml-4 text-xl">
              Simple and friendly interface for you and your audience.
            </div>
          </div>
          <div className="flex">
            <div className="mt-2">
              <GoCheckCircle className="text-3xl text-green-500" />
            </div>
            <div className="text-left ml-4 text-xl">
              Receive payments directly to your account with minimal fees.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
