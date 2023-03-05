import portada from '../img/portada.jpg';
import Seo from './Head';

function Nosotros() {
  const fecha = new Date();
  const añoActual = fecha.getFullYear()-1974;
  
  return (
    <>
    <Seo
        title={"Nosotros"}
        description={"Tienda de electrodomésticos y artículos para el hogar"}
        image={`${window.location.origin}/static/media/portada.8f9e2e9e4243c9605ecc.jpg`}
        pathSlug={window.location.href}
      />
    <div className='row'>
    <img src={portada} alt="portada" className='p-md-4 p-2 col-12 col-md-6' />
    <p className='p-md-4 p-2 col-12 col-md-6'>
      Mobilem es una empresa argentina con {añoActual} años de trayectoria en la
      venta de electrodomésticos, artículos para el hogar, muebles y colchones. <br /><br />
      Desde su apertura, Mobilem se ha convertido en un referente en la venta de
      electrodomésticos y artículos para el hogar en la provincia de Buenos
      Aires. <br /><br /> 
      Cuenta actualmente con 4 sucursales en donde se comercializan y
      financian productos mediante créditos personales y aceptando todas las
      tarjetas de crédito. <br /><br />
      La Compañía es una empresa familiar que tiene sus
      orígenes en la ciudad de Isidro Casanova, Provincia de Buenos Aires, donde
      comenzó sus actividades comerciales en 1974.
    </p>
    </div>
    </>
  );
}

export default Nosotros;
