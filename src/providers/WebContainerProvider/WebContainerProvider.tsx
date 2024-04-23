import React from 'react';
import { WebContainer } from '@webcontainer/api';
import { Template } from '../../templates/react-vite';

export const WebContainerContext = React.createContext<{
    webContainer: WebContainer | null;
    template: Template;
}>({
    webContainer: null,
    template: {} as Template,
});

type WebContainerProviderProps = {
    template: Template;
};

export default function WebContainerProvider({
    template,
    children,
}: React.PropsWithChildren<WebContainerProviderProps>) {
    const [webContainer, setWebContainer] = React.useState<WebContainer | null>(
        null
    );

    React.useEffect(() => {
        let instance: WebContainer | null = null;
        const initWebContainer = async () => {
            try {
                // First we boot a WebContainer
                instance = await WebContainer.boot();

                // After booting the container we copy all of our project files
                // into the container's file system
                await instance.mount(template.files);

                // Once the files have been mounted, we install the project's
                // dependencies by spawning `npm install`
                const install = await instance.spawn('npm', ['i']);
                await install.exit;

                // Once all dependencies have been installed, we can spawn `npm`
                // to run the `dev` script from the project's `package.json`
                await instance.spawn('npm', ['run', 'dev']);
                
                setWebContainer(instance);
            } catch (e) {
                console.log(e);
            }
        };

        initWebContainer();

        // Ideally, we should clean up the WebContainer instance when the component is unmounted.
        // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
        // https://github.com/stackblitz/webcontainer-core/issues/1125
        return () => {
          instance?.teardown();
          setWebContainer(null);
        };
    }, [template.files]);

    return (
        <WebContainerContext.Provider value={{ webContainer, template }}>
            {children}
        </WebContainerContext.Provider>
    );
}