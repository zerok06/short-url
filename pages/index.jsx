import FormShortUrl from "../components/FormShortUrl";
import NavBar from "../components/NavBar";
import Qr from "../components/Qr";
import useQrState from "../store/useQrStore";
export default function Home() {
  const { urlShort, setUrlShort } = useQrState((state) => state);
  console.log(process.env.VERCEL_URL);

  return (
    <>
      <NavBar />
      <main
        style={{
          marginTop: "80px",
          height: "90vh",
          gridTemplateColumns: "1fr 2fr",
        }}
        className="grid  w-11/12 m-auto"
      >
        <div>{urlShort && <Qr />}</div>
        <div className=" flex justify-center items-center flex-col gap-5 ">
          <h1 className="title-gradient uppercase text-5xl text-center font-bold w-4/5">
            Acortar link sin crear cuenta
          </h1>
          <p className="text-center text-gray-300 w-4/5">
            ¿Cansado de URLs largas e inmanejables? ¡Prueba nuestra herramienta
            de acortamiento de URLs! No necesitas crear una cuenta, es fácil y
            rápido.
          </p>
          <FormShortUrl />
        </div>
      </main>
      <footer className="w-full">
        Desarrollador por el equipo de <a href="#">FoxDesign</a>
      </footer>
    </>
  );
}
