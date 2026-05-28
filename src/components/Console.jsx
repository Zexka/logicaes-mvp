import { Play, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function Console({ results, isLoading, onRunCode }) {
  return (
    <div className="h-full bg-[#1a1d27] border-t border-gray-800 flex flex-col shrink-0">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-800 bg-bg-panel">
        <span className="text-xs sm:text-sm font-medium text-gray-300">Consola de Pruebas</span>
        
        <button
          onClick={onRunCode}
          disabled={isLoading}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 text-white text-xs sm:text-sm font-semibold rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-emerald-500/20 ${
            !results && !isLoading 
              ? 'bg-emerald-500 hover:bg-emerald-600 animate-pulse' 
              : 'bg-emerald-500/90 hover:bg-emerald-500'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
          )}
          <span className="hidden sm:inline">{isLoading ? 'Ejecutando...' : 'Ejecutar Código'}</span>
          <span className="sm:hidden">{isLoading ? '...' : 'Ejecutar'}</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        {!results && !isLoading && (
          <div className="text-gray-500 text-sm flex h-full items-center justify-center italic">
            Haz clic en "Ejecutar Código" para evaluar tu solución.
          </div>
        )}
        
        {isLoading && (
          <div className="text-emerald-500 text-sm flex flex-col gap-2 h-full items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Compilando y ejecutando pruebas...</span>
          </div>
        )}
        
        {results && !isLoading && (
          <div className="space-y-3">
            <div className="mb-4 text-sm text-gray-400 font-mono border-b border-gray-800 pb-2">
              <span className="text-gray-300 font-bold">Estado General: </span>
              <span className={results.every(r => r.passed) ? "text-emerald-500" : "text-red-500"}>
                {results.every(r => r.passed) ? "✅ Todas las pruebas pasaron" : "❌ Hay pruebas fallidas"}
              </span>
              <br />
              <span className="text-gray-300 font-bold">Resumen: </span>
              <span className="text-emerald-500">{results.filter(r => r.passed).length} pasaron</span>, 
              {results.filter(r => !r.passed).length > 0 && <span className="text-red-500"> {results.filter(r => !r.passed).length} fallaron</span>}
              <span className="text-gray-400"> (de {results.length} en total)</span>
            </div>

            {results.map((result, index) => (
              <div 
                key={result.id} 
                className={`p-3 rounded border border-gray-800/50 ${
                  result.passed 
                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10' 
                    : 'bg-red-500/5 hover:bg-red-500/10'
                } transition-colors`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {result.passed ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    )}
                    <span className={`font-mono text-xs sm:text-sm font-semibold ${result.passed ? 'text-emerald-500' : 'text-red-500'}`}>
                      {result.passed ? '✓' : '✕'} Caso {index + 1}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-500">{result.timeMs} ms</span>
                </div>
                
                <div className="text-xs sm:text-sm font-mono space-y-1 ml-5 sm:ml-7 bg-[#0f111a] p-2 rounded border border-gray-800">
                  <div className="text-gray-400 break-all">
                    <span className="text-gray-500">Entrada:</span> {result.input}
                  </div>
                  <div className="text-gray-400 break-all">
                    <span className="text-gray-500">Actual:</span> {result.output}
                  </div>
                  {!result.passed && (
                    <>
                      <div className="text-gray-400 break-all">
                        <span className="text-gray-500">Esperado:</span> {result.expected}
                      </div>
                      {result.error && (
                        <div className="text-red-400 mt-2 border-t border-red-500/20 pt-2">
                          <span className="text-red-500/70 block mb-1">Error:</span> 
                          <span className="whitespace-pre-wrap text-[10px] sm:text-xs">{result.error}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
