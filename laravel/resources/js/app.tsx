import React from 'react'; // 👈 Agregado para evitar el segundo error
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true }); // 👈 Ahora .tsx
    return pages[`./Pages/${name}.tsx`]; // 👈 Asegúrate de que los archivos sean .tsx
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});