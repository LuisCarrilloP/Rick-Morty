import { useRef } from "react";
import { useEffect } from "react";

export const useEffectOnce = ( effect => {

    const destroyFunc = useRef();
    const calledOnce = useRef(false);
    const renderAfterCalled = useRef(false);

    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }

    useEffect( () => {
        if (calledOnce.current) { 
            return; 
        }

        calledOnce.current = true;
        destroyFunc.current = effect();

        return ()=> {
            if (!renderAfterCalled.current) {
                return;
            }

            if (destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, [effect]);
})