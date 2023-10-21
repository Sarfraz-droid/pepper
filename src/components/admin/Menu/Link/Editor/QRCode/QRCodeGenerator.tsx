import React, { useEffect, useRef } from "react";
import { Shortlink } from "@/types/shortlink.types";

export const QRCodeContext = React.createContext({
  config: {},
  updateConfig: () => {},
} as {
  config: any;
  updateConfig: (key: string, value: any) => void;
});

function QRCodeComponent({
  item
} : {
  item: Shortlink
}) {


  /** To be Added later */

  // const [{config, ref}, { updateConfig, downloadPNG }] = useQR(item.shortlink, 100);

  // const [position, containerRef] = useElementPosition()

  // useEffect(() => {
  //   if(!position.width) return
  //   updateConfig("width", (position.width)/2)
  //   updateConfig("height", (position.width)/2)
  // },[position])

  const ref = useRef(null)

  const downloadPNG = () => {
    if(!ref.current) return

    const link = document.createElement('a')
    link.target = "_blank"
    link.download = "qr-code.png"
    link.href = (ref.current as any).src
    link.click()
  }


  return (
      <div className="w-full h-full flex flex-col">
        <div className="text-xs pt-2 font-semibold text-center text-gray-400">
          QR Code Generator
        </div>
        <div className="flex md:flex-row flex-col justify-center w-full h-full">
          <div className="flex-1 items-center flex flex-col"
          >
            {/* <div 
              className="p-2 rounded-md border-black/20"
            /> */}
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.shortlink}`} alt="QR Code"
              className="p-2 rounded-md border-black/20"
              ref={ref}
            />
            <div className="text-xs text-center mt-2 italic">
              Scan this QR code to open the link on your phone
            </div>
            <div>
              <button className="btn btn-small mt-4 flex gap-2"
                onClick={downloadPNG}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <div className="self-center">PNG</div>
              </button>
            </div>
          </div>
          <div className="flex-1 h-full overflow-auto">
            {/* <QRCustomizer /> */}
            <div
              className="flex flex-col items-center justify-center w-full h-full italic "
            >
              Coming Soon
            </div>
          </div>
        </div>
      </div>
  );
}

export default QRCodeComponent;
