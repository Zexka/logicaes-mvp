import { User, Code2, Trophy, ArrowLeft } from 'lucide-react';

export default function Header({ onVolver, nivelJugador = { num: 1, titulo: "Nivel 1" }, onShowSolution, showSolutionBtn }) {
  return (
    <header className="h-14 bg-bg-panel border-b border-gray-700 flex items-center justify-between px-4 sm:px-6 shrink-0 w-full z-20">
      <div className="flex items-center gap-2 sm:gap-4">
        {onVolver && (
          <button 
            onClick={onVolver}
            className="flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded transition-colors"
            title="Volver al menú"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/20 p-1.5 rounded-lg hidden sm:block">
            <Code2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            LógicaES
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        {showSolutionBtn && (
          <button 
            onClick={onShowSolution}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-medium rounded border border-blue-500/20 transition-colors"
          >
            Ver Solución Óptima
          </button>
        )}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 bg-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-700">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="hidden sm:inline">Nivel {nivelJugador.num}: {nivelJugador.titulo}</span>
          <span className="sm:hidden font-bold">Lvl {nivelJugador.num}</span>
        </div>
        
        <button className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600">
          <User className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </header>
  );
}
