import './Classico.css';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; // Importando o confete
import configData from '../../json/BU.json';
import GuessRow from '../../components/GuessRow';

const temIntersecao = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  return arr1.some(item => arr2.includes(item));
};

const arraysIguais = (arr1, arr2) => {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  const a = [...arr1].sort();
  const b = [...arr2].sort();
  return a.every((val, index) => val === b[index]);
};

function Classico() {
  const [inputValue, setInputValue] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [palpites, setPalpites] = useState([]);
  const [gabarito, setGabarito] = useState(null);
  
  // --- Novos Estados de Vitória ---
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    // 1. Verifica se o usuário já ganhou nesta sessão (aba do navegador)
    const jaGanhou = localStorage.getItem('venceu_bateria') === 'true';
    if (jaGanhou) {
      setHasWon(true);
    }

    // 2. Sorteia ou recupera o gabarito
    const bateriaSorteada = configData[Math.floor(Math.random() * configData.length)];
    setGabarito(bateriaSorteada);
  }, []);

  // Função para tocar o som
  const tocarSomVitoria = () => {
    // O arquivo deve estar na pasta /public do seu projeto Vite
    const audio = new Audio('/parabens.mp3'); 
    audio.play().catch(err => console.log("O navegador bloqueou o áudio automático:", err));
  };

  const handleInputChange = (e) => {
    if (hasWon) return;

    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      // 1. Mapeia os nomes de todas as baterias que já foram chutadas
      // (Como o nome é sempre o primeiro item do array de atributos, pegamos p[0].value)
      const nomesJaChutados = palpites.map((palpite) => palpite[0].value);

      // 2. Filtra as sugestões:
      // - Tem que começar com o que o usuário digitou
      // - NÃO pode estar na lista de nomes já chutados
      const filtradas = configData.filter((b) => 
        b.nome.toLowerCase().startsWith(value.toLowerCase()) &&
        !nomesJaChutados.includes(b.nome)
      );
      
      setSugestoes(filtradas);
    } else {
      setSugestoes([]);
    }
  };

  const handleSelectSuggestion = (bateriaEscolhida) => {
    if (!gabarito || hasWon) return;

    // Trava de segurança extra caso o usuário consiga forçar um clique repetido
    const jaFoiEscolhido = palpites.some((p) => p[0].value === bateriaEscolhida.nome);
    if (jaFoiEscolhido) {
      setInputValue('');
      setSugestoes([]);
      return;
    }

    // Converte os anos para números inteiros para poder comparar
    const anoPalpite = parseInt(bateriaEscolhida.fundacao, 10);
    const anoGabarito = parseInt(gabarito.fundacao, 10);
    let statusFundacao = 'red';

    if (anoPalpite === anoGabarito) {
      statusFundacao = 'green';
    } else if (anoPalpite < anoGabarito) {
      statusFundacao = 'red-up'; // Palpite é mais velho, resposta certa é MAIS NOVA (seta pra cima)
    } else {
      statusFundacao = 'red-down'; // Palpite é mais novo, resposta certa é MAIS VELHA (seta pra baixo)
    }

    const resultadoPalpite = [
      { value: bateriaEscolhida.nome, status: bateriaEscolhida.nome === gabarito.nome ? 'green' : 'red' },
      { value: bateriaEscolhida.universidade, status: bateriaEscolhida.universidade === gabarito.universidade ? 'green' : 'red' },
      { value: bateriaEscolhida.instituto.join(', '), status: arraysIguais(bateriaEscolhida.instituto, gabarito.instituto) ? 'green' : temIntersecao(bateriaEscolhida.instituto, gabarito.instituto) ? 'orange' : 'red' },
      { value: bateriaEscolhida.mascote.join(', '), status: arraysIguais(bateriaEscolhida.mascote, gabarito.mascote) ? 'green' : temIntersecao(bateriaEscolhida.mascote, gabarito.mascote) ? 'orange' : 'red' },
      { value: bateriaEscolhida.torneio.join(', '), status: arraysIguais(bateriaEscolhida.torneio, gabarito.torneio) ? 'green' : temIntersecao(bateriaEscolhida.torneio, gabarito.torneio) ? 'orange' : 'red' },
      
      // Passamos a variável calculada aqui embaixo:
      { value: bateriaEscolhida.fundacao, status: statusFundacao }
    ];

    setPalpites([resultadoPalpite, ...palpites]);
    setInputValue('');
    setSugestoes([]);

    if (bateriaEscolhida.nome === gabarito.nome) {
      setHasWon(true); 
      sessionStorage.setItem('venceu_bateria', 'true'); 
      tocarSomVitoria(); 
    }
  };

  return (
    <div className="classico-container">
      
      {/* RENDERIZA OS CONFETES SE GANHOU */}
      {hasWon && (
        <Confetti 
          width={window.innerWidth} 
          height={window.innerHeight} 
          recycle={false} // Para de cair depois de um tempo (não fica infinito)
          numberOfPieces={500}
        />
      )}

      {/* Mensagem de Vitória */}
      {hasWon && (
        <div className="victory-message" style={{ textAlign: 'center', color: '#22c55e', marginBottom: '20px' }}>
          <h2>🎉 Parabéns! Você acertou! 🎉</h2>
          <p>Volte amanhã para um novo desafio!</p>
        </div>
      )}

      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder={hasWon ? "Você já acertou hoje!" : "Digite o nome da Bateria..."} 
          value={inputValue}
          onChange={handleInputChange}
          className="search-input"
          disabled={hasWon} // <-- TRAVA O INPUT AQUI
          style={{ cursor: hasWon ? 'not-allowed' : 'text', opacity: hasWon ? 0.6 : 1 }}
        />
        
        {sugestoes.length > 0 && !hasWon && (
          <ul className="suggestions-list">
            {sugestoes.map((bateria, index) => (
              <li 
                key={index} 
                onClick={() => handleSelectSuggestion(bateria)}
                className="suggestion-item"
              >
                {bateria.nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="guesses-container">
        {palpites.map((linhaDeAtributos, index) => (
          <GuessRow key={index} attributes={linhaDeAtributos} />
        ))}
      </div>

    </div>
  );
}

export default Classico;