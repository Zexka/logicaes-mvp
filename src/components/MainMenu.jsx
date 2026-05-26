import { Brain, Code, Target, CheckCircle2, Trophy } from 'lucide-react';
import data from '../data/retos.json';

export default function MainMenu({ onSelectReto, retosCompletados = [], nivelJugador = {num: 1, titulo: "Novato Lógico"} }) {
  const retos = data.retos;
  const progreso = Math.round((retosCompletados.length / retos.length) * 100);

  return (
    <div className="min-h-screen bg-bg-dark text-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full mt-6 sm:mt-12 mb-10 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full mb-6">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-300">Nivel {nivelJugador.num}: {nivelJugador.titulo}</span>
          <div className="w-16 sm:w-24 h-2 bg-gray-700 rounded-full ml-2 overflow-hidden">
            <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4 sm:mb-6 tracking-tight pb-2">
          LógicaES
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-medium">
          Entrena tu lógica algorítmica, a tu ritmo y en tu idioma.
        </p>
        <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-2xl mx-auto">
          Preparación para entrevistas técnicas internacionales reduciendo la sobrecarga cognitiva. 
          Primero domina el "qué" y el "cómo", luego haremos la transición al inglés.
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {retos.map((reto) => {
          const isCompleted = retosCompletados.includes(reto.id);
          
          return (
            <div 
              key={reto.id} 
              className={`group relative bg-bg-panel border rounded-xl p-6 transition-all cursor-pointer flex flex-col ${
                isCompleted 
                  ? 'border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                  : 'border-gray-700 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
              }`}
              onClick={() => onSelectReto(reto)}
            >
              {/* Badge de Completado */}
              {isCompleted && (
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg border-2 border-bg-panel">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              <div className="mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 border transition-colors ${
                  isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-800 text-blue-400 border-gray-700 group-hover:border-blue-500/30'
                }`}>
                  {reto.competencia}
                </span>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {reto.titulo}
                </h2>
              </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Target className="w-4 h-4 text-emerald-500" />
                <span>Habilidad: <strong>{reto.habilidad}</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-2">
              {reto.etiquetas.map(etiq => (
                <span key={etiq} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                  {etiq}
                </span>
              ))}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
