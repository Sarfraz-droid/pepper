import Accordion from "@/components/UI/Accordion";
import FileUploader from "@/components/UI/FileUpload";
import React, { useContext } from "react";
import Select from "react-select";
import { QRCodeContext } from "./QRCodeGenerator";

const options = [
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "square",
  "extra-rounded",
];

function QRCustomizer() {
  const { config, updateConfig } = useContext(QRCodeContext);

  const fileUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return console.log("No file selected");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      updateConfig("image", reader.result);
    };
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <p className="text-xs my-2 text-center font-semibold text-gray-400">
        QR Code Customizer
      </p>

      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 w-full">
          <Accordion
            i={0}
            title="Image Options"
            className={{
              header:
                "cursor-pointer text-xs p-2 rounded-md bg-purple-400/20 text-purple-600 font-semibold",
              section: "p-2 bg-purple-100/20 rounded-md ",
            }}
          >
            <div className="flex flex-col gap-2 w-full ">
              <div className="flex gap-2 w-full justify-between">
                <FileUploader className="btn btn-small" onClick={fileUploader}>
                  + Upload File
                </FileUploader>
                {config.image && (
                  <img src={config.image} className="w-10 h-10" />
                )}
              </div>
              <div className="flex flex-col justify-center items-center w-full gap-2 text-xs">
                <label className=" opacity-60 font-semibold">
                  Margin ({config.imageOptions.margin}px)
                </label>
                <div className="flex justify-center items-center gap-2 w-full">
                  <span className="opacity-60">0px</span>
                  <input
                    type="range"
                    className="w-full accent-purple-600"
                    max={50}
                    min={0}
                    value={config.imageOptions.margin}
                    onChange={(e) =>
                      updateConfig("imageOptions.margin", e.target.value)
                    }
                  />
                  <span className="opacity-60">100px</span>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion
            i={2}
            title="Dot Options"
            className={{
              header:
                "cursor-pointer text-xs p-2 rounded-md bg-purple-400/20 text-purple-600 font-semibold",
              section: "p-2 bg-purple-100/20 rounded-md ",
            }}
          >
            <div className="flex flex-col gap-2 w-full ">
              <div className="flex gap-2">
                <label className="self-center opacity-60">Style</label>
                <Select
                  className=""
                  placeholder="Choose Style"
                  options={options.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  value={{
                    value: config.dotsOptions.type,
                    label: config.dotsOptions.type,
                  }}
                  onChange={(e) =>
                    e && updateConfig("dotsOptions.type", e.value)
                  }
                />
              </div>

              <div className="flex gap-2">
                <label className="self-center opacity-60">Color</label>
                <input
                  type="color"
                  value={config.dotsOptions.color}
                  onChange={(e) =>
                    updateConfig("dotsOptions.color", e.target.value)
                  }
                />
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default QRCustomizer;
