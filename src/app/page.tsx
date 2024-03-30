import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="flex justify-center items-center w-full min-h-36 bg-primary mx-auto rounded-xl">
        <div className="text-8xl font-black">
          <span className="text-gray-200">Z</span>
          <span className="text-gray-700">R</span>
        </div>
      </div>
      <div className="bg-primary flex w-full space-y-4 justify-center min-h-60 mt-4 rounded-lg  flex-col items-center p-5 mb-20">
        <h1 className="text-2xl font-black drop-shado text-gray-900 shadow-lg">
          Lihat Laporan
        </h1>
        <h1 className="text-2xl font-black text-gray-200 shadow-lg">
          Ambil Keputusan
        </h1>
        <h1 className="text-2xl font-black shadow-lg">
          Raih
          <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-500">
            Cuannyaa
          </span>
        </h1>
        <Image
          src="/images/bg-zr.jpg"
          width={600}
          height={600}
          alt="image front"
          className="rounded-lg"
        />
      </div>
    </>
  );
}
