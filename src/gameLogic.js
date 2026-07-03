/**
 * Compara dois arrays para ver se têm algum item em comum (para gerar o Laranja)
 */
const temIntersecao = (arr1, arr2) => {
  return arr1.some(item => arr2.includes(item));
};

/**
 * Compara se dois arrays são exatamente iguais
 */
const arraysIguais = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  // Ordena para garantir que ["Azul", "Branco"] seja igual a ["Branco", "Azul"]
  const a = [...arr1].sort();
  const b = [...arr2].sort();
  return a.every((val, index) => val === b[index]);
};

/**
 * Função Principal de Comparação
 * @param {string} palpiteNome - O nome digitado pelo usuário
 * @param {string} respostaCertaNome - O nome da bateria que é o "Gabarito"
 * @param {Array} listaBaterias - Seu array/JSON com todas as baterias
 * @returns {Array} - Array formatado pronto para o componente <GuessRow />
 */
export const avaliarPalpite = (palpiteNome, respostaCertaNome, listaBaterias) => {
  // 1. Busca os objetos completos no JSON
  const palpite = listaBaterias.find(b => b.nome.toLowerCase() === palpiteNome.toLowerCase());
  const gabarito = listaBaterias.find(b => b.nome.toLowerCase() === respostaCertaNome.toLowerCase());

  // Tratamento de erro caso o usuário digite algo que não existe
  if (!palpite) {
    throw new Error("Bateria não encontrada na base de dados!");
  }

  // 2. Monta o array de resultados comparando atributo por atributo
  const resultado = [
    {
      // NOME
      value: palpite.nome,
      status: palpite.nome === gabarito.nome ? 'green' : 'red'
    },
    {
      // UNIVERSIDADE
      value: palpite.universidade,
      status: palpite.universidade === gabarito.universidade ? 'green' : 'red'
    },
    {
      // ESTADO
      value: palpite.estado,
      status: palpite.estado === gabarito.estado ? 'green' : 'red'
    },
    {
      // CORES (Array de strings)
      value: palpite.cores.join(', '), // Transforma ["Preto", "Amarelo"] em "Preto, Amarelo"
      status: arraysIguais(palpite.cores, gabarito.cores) 
                ? 'green' 
                : temIntersecao(palpite.cores, gabarito.cores) 
                  ? 'orange' 
                  : 'red'
    },
    {
      // FUNDAÇÃO (Número)
      // Dica: Aqui você pode no futuro retornar um 'red-up' ou 'red-down' para colocar as setinhas
      value: palpite.fundacao.toString(),
      status: palpite.fundacao === gabarito.fundacao ? 'green' : 'red'
    }
  ];

  return resultado;
};