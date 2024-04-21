import { useRef, useEffect } from 'react';
import { useWebContainer } from '../../providers/WebContainerProvider/useWebContainer';

export default function Preview() {
    const { webContainer } = useWebContainer();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!webContainer || !iframeRef.current) return;

        webContainer.on('server-ready', (_, url) => {
            iframeRef.current!.src = url;
        });
    }, [webContainer]);

    return (
        <iframe
            ref={iframeRef}
            className="h-full w-full border-2"
            src="loading.html"
        />
    );
}