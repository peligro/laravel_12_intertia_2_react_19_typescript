 
import { usePage } from '@inertiajs/react';

const Index = () => {
  const { base_url } = usePage().props;

  return (
    <>
    <h1>Sobre nosotros</h1>
    <p>
    <img src={`${base_url}img/viejitos.png`} alt="Mi foto" />

    </p>
    </>
  )
}

export default Index