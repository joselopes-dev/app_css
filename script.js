const box = document.querySelector('.box');
const cssEditor = document.getElementById('css-editor');
const applyButton = document.getElementById('apply-css');
const nextLevelButton = document.getElementById('next-level');
const instruction = document.getElementById('instruction');
const showHintButton = document.getElementById('show-hint');
const hintElement = document.getElementById('hint');

let level = 0;

const levels = [

  {
    instruction: 'Altere o estilo da borda para tracejada.',
    check: () => getComputedStyle(box).borderStyle === 'dashed',
  },
  {
    instruction: 'Transforme o quadrado em um retângulo horizontal com largura de 200px e altura de 100px.',
    check: () =>
      getComputedStyle(box).width === '200px' &&
      getComputedStyle(box).height === '100px',
  },
  {
    instruction: 'Defina a opacidade do quadrado para 70%.',
    check: () => getComputedStyle(box).opacity === '0.7',
  },
  {
    instruction: 'Faça o quadrado azul.',
    hint: 'Tente usar a propriedade background-color e defina o valor para azul.',
    check: () => getComputedStyle(box).backgroundColor === 'rgb(0, 0, 255)',
  },
  {
    instruction: 'Aumente a largura do quadrado para 150px.',
    hint: 'Utilize a propriedade width e defina o valor como 150px.',
    check: () => getComputedStyle(box).width === '150px',
  },
  {
    instruction: 'Centralize o quadrado horizontalmente na tela.',
    hint: 'Use a propriedade margin-left e margin-right com valores iguais para centralizar.',
    check: () => {
      const marginLeft = getComputedStyle(box).marginLeft;
      const marginRight = getComputedStyle(box).marginRight;
      return marginLeft === marginRight && marginLeft !== '0px';
    },
  },
  {
    instruction: 'Arredonde os cantos do quadrado com um raio de 50%.',
    hint: 'Use a propriedade border-radius para arredondar os cantos. Tente "50%" para um círculo.',
    check: () => getComputedStyle(box).borderRadius === '50%',
  },
  // Adicione mais desafios e dicas conforme necessário...
 
];

function applyCSS() {
  const cssCode = cssEditor.value;
  try {
    box.style.cssText = cssCode;
    if (levels[level].check()) {
      nextLevelButton.disabled = false;
    } else {
      nextLevelButton.disabled = true;
    }
  } catch (error) {
    console.error('Erro ao aplicar CSS:', error);
  }
}

function nextLevel() {
    level++;
    if (level < levels.length) {
      instruction.textContent = levels[level].instruction; // Atualiza a instrução para o próximo nível
      hintElement.style.display = 'none'; // Esconde a dica ao passar para o próximo nível
      hintElement.textContent = ''; // Limpa a dica
      cssEditor.value = ''; // Limpa o editor de CSS
      box.style.cssText = ''; // Limpa os estilos aplicados
      nextLevelButton.disabled = true; // Desabilita o botão de próximo nível até que o desafio seja completado
    } else {
      instruction.textContent = 'Parabéns! Você completou todos os desafios!'; // Mensagem de conclusão
      cssEditor.disabled = true; // Desabilita o editor para evitar alterações
      applyButton.disabled = true; // Desabilita o botão de aplicar CSS
      nextLevelButton.disabled = true; // Desabilita o botão de próximo nível
      showHintButton.disabled = true; // Desabilita o botão de dica
    }
  }
  
      
      function nextLevel() {
        level++;
        if (level < levels.length) {
          // Atualiza a instrução e reseta o estado do nível
          instruction.textContent = levels[level].instruction;
          hintElement.textContent = ''; // Limpa a dica anterior
          hintElement.style.display = 'none'; // Esconde a dica
          cssEditor.value = '';
          box.style.cssText = ''; // Limpa os estilos aplicados
          nextLevelButton.disabled = true;
        } else {
          // Finaliza o jogo
          instruction.textContent = 'Parabéns! Você completou todos os desafios!';
          cssEditor.disabled = true;
          applyButton.disabled = true;
          nextLevelButton.disabled = true;
          showHintButton.disabled = true;
        }
      }
      
      function showHint() {
        hintElement.textContent = levels[level].hint;
        hintElement.style.display = 'block';
      }
      
      // Eventos de clique
      applyButton.addEventListener('click', applyCSS);
      nextLevelButton.addEventListener('click', nextLevel);
      showHintButton.addEventListener('click', showHint);
      
     // Inicializa o primeiro nível.
instruction.textContent = levels[level].instruction;

const editor = CodeMirror.fromTextArea(cssEditor, {
    lineNumbers: true,
    mode: 'css',
  });
  applyButton.addEventListener('click', () => {
    cssEditor.value = editor.getValue();
    applyCSS();
  });
  
      