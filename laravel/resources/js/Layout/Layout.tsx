import { Link } from '@inertiajs/react';
import { LayoutPropsInterface } from '../Interfaces/LayoutPropsInterface';

 
const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <>
      <div className="container">
        <header>
          <ul>
            <li>
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/nosotros">
                Nosotros
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="">
                Tareas
              </Link>
            </li>
          </ul>
        </header>
        <main>
          <div id="toast-container" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1050' }}></div>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;