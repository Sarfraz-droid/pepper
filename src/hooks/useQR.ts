import React, { useEffect, useRef } from 'react'
import QRCodeStyling from "qr-code-styling";


function useQR(url : string, size: number) {
    const [config, setConfig] = React.useState({
        width: size,
        height: size,
        data: `${process.env.NEXT_PUBLIC_API}/${url}`,
        image: '',
        dotsOptions: {
            color: '#000000',
            type: 'classy' as any
        },
        imageOptions: {
            margin: 2
        }
    })

    const ref = useRef<HTMLDivElement>(null)


    const qr = useRef<QRCodeStyling>(new QRCodeStyling(config))

    const updateKey = (obj: any,key: string, value: string) => {
        const newObj = {...obj}

        const keyDir = key.split('.')


        const keyUpdater = (obj: any, keyDir: string[], pos: number) => {
            if(pos === keyDir.length - 1) {
                obj[keyDir[pos]] = value
                return obj
            }

            obj[keyDir[pos]] = keyUpdater(obj[keyDir[pos]],keyDir,pos + 1)

            return obj
        }

        return keyUpdater(newObj,keyDir,0)
    }

    const updateConfig = (key : string,value : any) => {
        setConfig((prev) => {
            let val = updateKey({...prev} as any, key, value)

            return val
        })
    }  
    
    const downloadPNG = () => {
        const qrCode = new QRCodeStyling({
            ...config,
            width: 512,
            height: 512
        })

        qrCode.download({
            name: url,
            extension: 'png'
        })
    }

    useEffect(() => {
        qr.current.update(config)
    },[url, config])

    useEffect(() => {
        if(ref.current) {
            console.log(ref.current)
            qr.current.append(ref.current)
        }
    },[ref])



    return [{config, ref}, {
        updateConfig,
        downloadPNG
    }] as [
        {
            config: typeof config,
            ref: typeof ref
        }, 
        {
            updateConfig: (key : string,value : any) => void,
            downloadPNG: () => void
        }
    ]
}

export default useQR
