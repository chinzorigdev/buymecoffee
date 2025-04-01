import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between items-center bg-floral-white py-4 px-8">
        <div className="flex justify-between items-center font-semibold space-x-8 ">
          <ul className="flex space-x-4">
            <li>FAQ</li>
            <li>Resources</li>
          </ul>
        </div>
        <div>
          <Image
            src="/img/bmc-brand-logo.svg"
            alt="Logo"
            width={180}
            height={200}
            className="mx-auto my-4"
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <input type="text" className=" bg-gray-200 rounded-lg h-10" />
          </div>
          <div>
            <button className="font-semibold  py-2 px-4 rounded-lg cursor-pointer">
              Нэвтрэх
            </button>
          </div>
          <div>
            <button className="bg-yellow-300 font-semibold text-white py-4 px-6 rounded-4xl cursor-pointer">
              Бүртгүүлэх
            </button>
          </div>
        </div>
      </header>
    </main>
  );
}
