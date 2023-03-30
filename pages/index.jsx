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
          marginTop: "80px",
          height: "90vh",
          gridTemplateColumns: "2fr 1fr",
        }}
        className=" bg-circles grid gap-10  w-9/12 m-auto"
      >
        <div className=" flex justify-center items-start flex-col gap-5 ">
          <h1 className="  text-6xl w-4/5">
            <span className="font-semibold">Acortar tu link sin</span>
            <span className="title-gradient font-extrabold"> crear cuenta</span>
          </h1>
          <p className=" text-gray-500 w-4/5 text-lg">
            ¿Cansado de URLs largas e inmanejables? ¡Prueba nuestra herramienta
            de acortamiento de URLs! No necesitas crear una cuenta, es fácil y
            rápido.
          </p>
          <FormShortUrl />
        </div>
        <div>{urlShort && <Qr />}</div>
      </main>

      <footer className="w-full">
        Desarrollador por el equipo de <a href="#">FoxDesign</a>
      </footer>
    </>
  );
}
