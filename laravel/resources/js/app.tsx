import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from './Layout/Layout';
import { PageModuleInterface } from './Interfaces/PageModuleInterface';



createInertiaApp({
    title: (title) =>
        title ? `Tamila - ${title}` : "Tamila",
    resolve: (name) => {
        const pages = import.meta.glob<PageModuleInterface>('./Pages/**/*.tsx', { eager: true });
        const pagePath = `./Pages/${name}.tsx`;

        const pageModule = pages[pagePath];

        if (!pageModule) {
            throw new Error(`Page "${name}" not found.`);
        }

        // Asigna el layout si no está definido
        const pageComponent = pageModule.default;

        // ✅ Aquí está la corrección: usa "Page" en lugar de "<pageComponent />"
        const Page = pageComponent;
        const pageWithLayout = pageModule.layout ? (
            pageModule.layout(<Page />)
        ) : (
            <Layout><Page /></Layout>
        );

        return {
            ...pageModule,
            default: () => pageWithLayout,
        };
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {//barra de progreso en peticiones http
        color: '#ff0000',
        showSpinner: true
    }
});