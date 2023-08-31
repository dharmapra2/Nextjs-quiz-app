import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full">
      <section className="bg-orange-400">img</section>
      <section className="bg-lime-700">form</section>
    </main>
  );
}
