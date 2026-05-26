import { X, Trophy, Info } from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function SolutionModal({ reto, onClose }) {
  if (!reto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-panel border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1a1d27]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Solución Óptima (Senior)</h2>
              <p className="text-sm text-gray-400">{reto.titulo}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-1">Complejidad Algorítmica (Big O)</h3>
              <p className="text-sm text-blue-200 leading-relaxed">{reto.complejidad}</p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-800 h-[300px]">
            <div className="bg-[#1a1d27] px-4 py-2 border-b border-gray-800 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Código de Referencia</span>
              <span className="text-xs text-gray-500">JavaScript</span>
            </div>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={reto.solucionOptima}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 24,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                wordWrap: "on"
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-[#1a1d27] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
