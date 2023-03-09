import imgAncho from '../img/medidas3.jpg'
import imgPatilla from '../img/medidas4.jpg'

const Anteojo = ({medidas}) => {

  const {ancho, alto, patilla} = medidas[0]

    return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={{ marginBottom: '0' }}>{ancho}mm</span>
    <img src={imgAncho} alt="Medidas del anteojo" width={80} className="img-fluid" />
  </div>
  <span style={{ marginTop: '1rem', marginRight:'1rem', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{alto}mm</span>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={{ marginBottom: '0' }}>{patilla}mm</span>
    <img src={imgPatilla} alt="Medidas del anteojo" width={80} className="img-fluid" />
  </div>
</div>




    </>
  );
};

export default Anteojo;
