import { useCallback, useState } from "react";

export const useElementPosition = () => {
    const [position, setPosition] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0
    });

    const ref = useCallback((node : any) => {
        if (node !== null) {
            setPosition({
                top: node.offsetTop,
                bottom: node.offsetBottom,
                left: node.offsetLeft,
                right: node.offsetRight,
                width: node.offsetWidth,
                height: node.offsetHeight
            });
        }
    }, []);

    return [position, ref] as [
        typeof position,
        typeof ref
    ];
}
