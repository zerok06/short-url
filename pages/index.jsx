import Footer from "../components/Footer";
import FormShortUrl from "../components/FormShortUrl";
import NavBar from "../components/NavBar";
import Qr from "../components/Qr";
import useQrState from "../store/useQrStore";
export default function Home() {
  const { urlShort, setUrlShort } = useQrState((state) => state);

  return (
    <>
      <NavBar />
      <main
        style={{
          minHeight: "90vh",
          /* gridTemplateColumns: "2fr 1fr", */
        }}
        className=" bg-circles gap-10 flex  mt-20 w-11/12 lg:w-9/12 m-auto  flex-col lg:flex-row lg:mt-20  "
      >
        <div className=" flex justify-center flex-1 items-center lg:items-start flex-col gap-5 ">
          <h1 className=" text-center text-5xl lg:text-left lg:text-6xl  w-4/5">
            <span className="font-extrabold">Acortar tu link sin</span>
            <span className="title-gradient font-extrabold"> crear cuenta</span>
          </h1>
          <p className=" text-center lg:text-left text-gray-600 w-4/5 text-base lg:text-lg">
            ¿Cansado de URLs largas e inmanejables? ¡Prueba nuestra herramienta
            de acortamiento de URLs! No necesitas crear una cuenta, es fácil y
            rápido.
          </p>
          <FormShortUrl />
        </div>
        <div className="flex-1">{urlShort && <Qr />}</div>
      </main>

      <Footer />
    </>
  );
}
