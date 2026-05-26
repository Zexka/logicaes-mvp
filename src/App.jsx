import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import ProblemDescription from './components/ProblemDescription';
import CodeEditor from './components/CodeEditor';
import Console from './components/Console';
import MainMenu from './components/MainMenu';
import SolutionModal from './components/SolutionModal';
import { evaluateCode } from './utils/evaluator';

// Utilidad para calcular el nivel del jugador
const calcularNivel = (completadosCount) => {
  if (completadosCount === 0) return { num: 1, titulo: "Novato Lógico" };
  if (completadosCount === 1) return { num: 2, titulo: "Aprendiz de Algoritmos" };
  if (completadosCount === 2) return { num: 3, titulo: "Desarrollador Trainee" };
  return { num: 4, titulo: "Ingeniero Junior" };
};

function App() {
  const [retoActivo, setRetoActivo] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retosCompletados, setRetoCompletados] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const nivelJugador = calcularNivel(retosCompletados.length);

  // Cargar retos completados al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('logicaes_completados');
    if (guardados) {
      setRetoCompletados(JSON.parse(guardados));
    }
  }, []);

  // Cuando se selecciona un reto, inicializamos el código desde LocalStorage o código semilla
  useEffect(() => {
    if (retoActivo) {
      const savedCode = localStorage.getItem(`logicaes_code_${retoActivo.id}`);
      setCode(savedCode || retoActivo.codigoInicial);
      setResults(null);
      setShowSolution(false);
    }
  }, [retoActivo]);

  // Guardar código en LocalStorage mientras escribe
  useEffect(() => {
    if (retoActivo && code) {
      localStorage.setItem(`logicaes_code_${retoActivo.id}`, code);
    }
  }, [code, retoActivo]);

  // Ejecutar el código envuelto en useCallback para los atajos
  const handleRunCode = useCallback(async () => {
    if (!retoActivo || isLoading) return;
    setIsLoading(true);
    setResults(null);
    
    const evaluationResults = await evaluateCode(code, retoActivo);
    setResults(evaluationResults);
    
    // Verificar si todos pasaron
    const todosPasaron = evaluationResults.every(r => r.passed);
    if (todosPasaron) {
      // Disparar confeti!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#3b82f6', '#fbbf24']
      });

      // Mostrar modal de solución experta después de 1.5s
      setTimeout(() => setShowSolution(true), 1500);

      setRetoCompletados(prev => {
        if (!prev.includes(retoActivo.id)) {
          const nuevos = [...prev, retoActivo.id];
          localStorage.setItem('logicaes_completados', JSON.stringify(nuevos));
          return nuevos;
        }
        return prev;
      });
    }
    
    setIsLoading(false);
  }, [retoActivo, code, isLoading]);

  const handleVolver = useCallback(() => {
    setRetoActivo(null);
    setCode("");
    setResults(null);
    setShowSolution(false);
  }, []);

  // Atajos de teclado globales
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      } else if (e.key === 'Escape' && retoActivo && !showSolution) {
        e.preventDefault();
        handleVolver();
      } else if (e.key === 'Escape' && showSolution) {
        e.preventDefault();
        setShowSolution(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode, handleVolver, retoActivo, showSolution]);

  if (!retoActivo) {
    return <MainMenu onSelectReto={setRetoActivo} retosCompletados={retosCompletados} nivelJugador={nivelJugador} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-bg-dark text-gray-100 overflow-hidden relative">
      <Header 
        onVolver={handleVolver} 
        nivelJugador={nivelJugador} 
        onShowSolution={() => setShowSolution(true)}
        showSolutionBtn={retosCompletados.includes(retoActivo.id) || results?.every(r => r.passed)}
      />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Panel Izquierdo: Descripción del problema */}
        <div className="w-full lg:w-[40%] h-[40%] lg:h-full shrink-0 relative z-10 overflow-y-auto custom-scrollbar">
          <ProblemDescription reto={retoActivo} />
        </div>
        
        {/* Panel Derecho: Editor y Consola */}
        <div className="w-full lg:w-[60%] h-[60%] lg:h-full flex flex-col border-t lg:border-t-0 lg:border-l border-gray-800 relative z-0">
          <div className="h-[60%] lg:h-[70%]">
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              onRunCode={handleRunCode} 
              onReset={() => setCode(retoActivo.codigoInicial)}
            />
          </div>
          <div className="h-[40%] lg:h-[30%]">
            <Console 
              results={results} 
              isLoading={isLoading} 
              onRunCode={handleRunCode} 
            />
          </div>
        </div>
      </main>

      {showSolution && (
        <SolutionModal 
          reto={retoActivo}
          onClose={() => setShowSolution(false)}
        />
      )}
    </div>
  );
}

export default App;
