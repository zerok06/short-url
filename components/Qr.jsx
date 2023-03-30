import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import useQrState from "../store/useQrStore";
import ShortUrlPreview from "./ShortUrlPreview";

const Controls = ({ children }) => {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend>Configuraciones</legend>
      {children}
    </fieldset>
  );
};

const Qr = () => {
  const [controls, setControls] = useState({
    size: 200,
    statusImage: false,
    color: "",
    includeImage: {
      src: "https://foxtechilo.com/wp-content/uploads/2023/02/cropped-cropped-Logo.png",
      height: 24,
      width: 24,
      posX: undefined,
      posY: undefined,
      centerImage: false,
      excavate: true,
    },
    precisionLevel: "H",
  });
  useEffect(() => {
    console.log(controls);
  }, [controls]);
  const { urlShort } = useQrState((state) => state);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        className="  flex flex-col justify-center items-center h-full w-full"
      >
        <span className="text-2xl">⬇️⬇️⬇️⬇️</span>
        <br />
        <ShortUrlPreview />
        <br />
        <div className=" bg-white bg-opacity-70 shadow-2xl shadow-gray-300 rounded-3xl  py-5 px-5">
          <div
            style={{ height: "250px", width: "250px" }}
            className="flex justify-center items-center"
          >
            <QRCodeCanvas
              className="m-0"
              value={"http://" + window.location.host + "/" + urlShort}
              size={controls.size}
              bgColor={"#ffffff"}
              fgColor={controls.color || "#000"}
              level={controls.precisionLevel}
              includeMargin={true}
              imageSettings={controls.statusImage ? controls.includeImage : {}}
            />
          </div>
          <Controls>
            <label className="w-full flex justify-between items-center">
              Nivel de precision:
              <select
                className="py-1 px-2"
                defaultValue={"H"}
                onChange={(e) =>
                  setControls(() => ({
                    ...controls,
                    precisionLevel: e.target.value,
                  }))
                }
              >
                <option value="L">Bajo</option>
                <option value="M">Medio</option>
                <option value="H">Alto</option>
              </select>
            </label>
            <label className="w-full flex justify-between items-center">
              Tamano:
              <input
                className="bg-red-500"
                type="range"
                min={100}
                value={controls.size}
                max={250}
                onChange={(e) =>
                  setControls(() => ({
                    ...controls,
                    size: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label className="w-full flex justify-between items-center">
              Color:
              <input
                type="color"
                onChange={(e) =>
                  setControls(() => ({ ...controls, color: e.target.value }))
                }
              />
            </label>
            <label className="w-full flex justify-between items-center">
              Imagen incluida:
              <input
                type="checkbox"
                onChange={(e) => {
                  setControls(() => ({
                    ...controls,
                    statusImage: e.target.checked,
                  }));
                }}
              />
            </label>
            <div>
              <label className="w-full flex justify-between items-center">
                Imagen
                <input
                  className="bg-gray-200"
                  type="url"
                  placeholder="https://gatitos.com/1.png"
                  onChange={(e) =>
                    setControls(() => ({
                      ...controls,
                      includeImage: {
                        ...controls.includeImage,
                        src: e.target.value,
                      },
                    }))
                  }
                />
              </label>
              <label className="w-full flex justify-between items-center">
                Escala:
                <input
                  type="range"
                  min={50}
                  max={60}
                  defaultValue={1}
                  onChange={(e) =>
                    setControls(() => ({
                      ...controls,
                      includeImage: {
                        ...controls.includeImage,
                        height: 24 * (e.target.value / 30),
                        width: 24 * (e.target.value / 30),
                      },
                    }))
                  }
                />
              </label>
            </div>
          </Controls>
        </div>
      </motion.div>
    </>
  );
};

export default Qr;
