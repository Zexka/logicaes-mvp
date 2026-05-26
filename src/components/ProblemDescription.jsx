import { useState } from 'react';
import { BookOpen, Lightbulb, ArrowDown } from 'lucide-react';
import GlosarioTooltip from './GlosarioTooltip';

export default function ProblemDescription({ reto }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  if (!reto) return null;

  const handleScroll = (e) => {
    if (e.target.scrollTop > 20) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  const renderDescription = (htmlString) => {
    const parts = htmlString.split(/(<GlosarioTooltip[^>]+>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<GlosarioTooltip')) {
        const matchES = part.match(/palabraES=['"]([^'"]+)['"]/);
        const matchEN = part.match(/traduccionEN=['"]([^'"]+)['"]/);
        if (matchES && matchEN) {
          return <GlosarioTooltip key={index} palabraES={matchES[1]} traduccionEN={matchEN[1]} />;
        }
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className="h-full relative flex flex-col bg-bg-panel border-b lg:border-b-0 lg:border-r border-gray-700">
      <div 
        className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar"
        onScroll={handleScroll}
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-3 text-white">{reto.titulo}</h2>
          
          <div className="flex gap-2 mb-6">
            <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              {reto.competencia}
            </span>
            {reto.etiquetas.map(etiqueta => (
              <span key={etiqueta} className="px-2.5 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full border border-gray-600">
                {etiqueta === "Tabla Hash" ? (
                  <GlosarioTooltip palabraES="Tabla Hash" traduccionEN="Hash Table" />
                ) : etiqueta === "Strings" ? (
                  <GlosarioTooltip palabraES="Strings" traduccionEN="Strings" />
                ) : etiqueta === "Pilas" ? (
                  <GlosarioTooltip palabraES="Pilas" traduccionEN="Stacks" />
                ) : (
                  etiqueta
                )}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed">
            <div className="mb-6 space-y-4 text-gray-300 inline-block w-full">
              {reto.descripcion.map((parrafo, i) => (
                <p key={i}>{renderDescription(parrafo)}</p>
              ))}
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 flex gap-3 items-start">
              <span className="text-xl leading-none">💡</span>
              <div className="text-sm text-blue-200">
                <strong className="block text-blue-400 mb-1">Nota para principiantes:</strong>
                No necesitas leer datos con <code>prompt()</code> ni imprimirlos. 
                Completa la función <code>{reto.funcion.nombre}</code>. El evaluador pasará los argumentos automáticamente al presionar Ejecutar.
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Ejemplos
            </h3>

            {reto.ejemplos.map((ej, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-800">
                <p className="mb-1"><strong className="text-white">Ejemplo {index + 1}:</strong></p>
                <p className="mb-1"><strong>Entrada:</strong> <code>{ej.entrada}</code></p>
                <p className="mb-1"><strong>Salida:</strong> <code>{ej.salida}</code></p>
              </div>
            ))}

            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Restricciones</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-400 mb-8">
              {reto.restricciones.map((res, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: res }}></li>
              ))}
            </ul>

            {/* Sistema de Pistas Socráticas */}
            {reto.pistas && reto.pistas.length > 0 && (
              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  ¿Atascado? Pistas
                </h3>
                <div className="space-y-3">
                  {reto.pistas.map((pista, idx) => (
                    <details key={idx} className="group bg-gray-800/50 rounded-lg border border-gray-700 open:border-yellow-500/50 transition-colors">
                      <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-300 hover:text-white flex items-center justify-between outline-none">
                        Pista {idx + 1}
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div 
                        className="px-4 pb-4 pt-1 text-sm text-gray-400"
                        dangerouslySetInnerHTML={{ __html: pista }}
                      />
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flecha indicadora de Scroll, solo en pantallas móviles */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden pointer-events-none transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0' : 'opacity-100 animate-bounce'
        }`}
      >
        <div className="bg-gray-800/90 text-gray-300 px-3 py-1.5 rounded-full shadow-lg border border-gray-600 flex items-center gap-2 backdrop-blur-sm text-xs font-medium">
          <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
          <span>Desliza para leer</span>
        </div>
      </div>
    </div>
  );
}
