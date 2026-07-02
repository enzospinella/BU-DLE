import './Home.css'
import Button from '../components/Button.jsx'
import { GiDrum } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

  return (
    <>
        <div className="home">
            <div className="esquerda">
            </div>

            <div className="centro">
                <h1>BU-Dle</h1> 
                <div className="botoes">
                    <Button icone={<GiDrum />} variant="primary" size="md" className="botao" alt="Modo clássico do BUDLE, adivinhe a BU de hoje com base em algumas das suas características" onClick={() => navigate('/classico')}>Clássico</Button>
                    <Button icone={<GiDrum />} variant="primary" size="md" className="botao" alt="Adivinhe a BU de hoje com base em uma foto destorcida da sua logo" onClick={() => navigate('/foto')}>Foto</Button>
                    <Button icone={<GiDrum />} variant="primary" size="md" className="botao" alt="Adivinhe a BU de hoje com base em um trecho da apresentação dela" onClick={() => navigate('/apresentacao')}>Apresentação</Button>
                </div>
            </div>

            <div className="direita">
            </div>
        </div>
    </>
  )
}

export default Home