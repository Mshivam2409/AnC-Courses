import { randomBytes } from "crypto";
import { useEffect } from "react";
import { insertScript, removeScript } from "utils/script";

const useScript = (src: string, parentId: string, dependencies: any[] = [], elementid: string = randomBytes(6).toString('hex')) => {
    useEffect(() => {
        // If there's no window there's nothing to do for us
        if (!window) {
            return;
        }
        const document = window.document;
        if (document.getElementById(parentId)) {
            insertScript(
                src,
                elementid,
                document.body
            );
        }
        // Cleanup; remove the script from the page
        return () => removeScript(elementid, document.body);
    }, [...dependencies]);
}

export default useScript

