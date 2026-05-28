export const evaluateCode = async (userCode, reto) => {
  // Simulamos un pequeño delay de compilación para UX (600ms - 1000ms)
  const compileDelay = Math.floor(Math.random() * 400) + 600;
  await new Promise((resolve) => setTimeout(resolve, compileDelay));

  // Definimos el código que correrá aislado en el Web Worker
  const workerCode = `
    self.onmessage = function(e) {
      const { userCode, reto, test } = e.data;
      const start = performance.now();
      
      try {
        const executableCode = \`
          \${userCode}
          return \${reto.funcion.nombre}(\${reto.funcion.parametros.join(', ')});
        \`;
        
        const fn = new Function(...reto.funcion.parametros, executableCode);
        const result = fn(...test.input);
        const end = performance.now();
        
        self.postMessage({ type: 'success', result, time: end - start });
      } catch (error) {
        self.postMessage({ type: 'error', name: error.name, message: error.message });
      }
    };
  `;

  // Creamos un Blob URL para instanciar el Worker sin necesitar un archivo físico
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);

  const runTest = (test) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerUrl);
      let isResolved = false;
      
      // TIMEOUT: Si el Worker tarda más de 2000ms, asumimos bucle infinito y lo matamos
      const timeoutId = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          worker.terminate(); // 🔥 Destruye el hilo inmediatamente
          resolve({
            id: test.id,
            passed: false,
            output: 'Ninguna (Bloqueado)',
            expected: JSON.stringify(test.expected),
            error: '⚠️ Límite de Tiempo Excedido: Tu código tardó más de 2 segundos en ejecutarse. Es probable que hayas introducido un bucle infinito (Ej. while(true)).',
            timeMs: '> 2000.00'
          });
        }
      }, 2000);

      // Si el Worker responde a tiempo:
      worker.onmessage = (e) => {
        if (isResolved) return;
        isResolved = true;
        clearTimeout(timeoutId);
        worker.terminate(); // Limpiamos el hilo tras su uso
        
        const { type, result, time, name, message } = e.data;
        
        let passed = false;
        let output = null;
        let errorMsg = null;
        
        if (type === 'success') {
          passed = JSON.stringify(result) === JSON.stringify(test.expected);
          output = result !== undefined ? JSON.stringify(result) : 'undefined';
        } else {
          errorMsg = message;
          if (name === 'TypeError') {
            errorMsg = `⚠️ Error de Tipo: Un valor no es del tipo esperado.\nDetalles: ${message}`;
          } else if (name === 'ReferenceError') {
            errorMsg = `⚠️ Error de Referencia: Intentaste usar una variable que no existe.\nDetalles: ${message}`;
          } else if (name === 'SyntaxError') {
            errorMsg = `⚠️ Error de Sintaxis: Revisa paréntesis, llaves o comillas.\nDetalles: ${message}`;
          } else {
            errorMsg = `⚠️ Error Inesperado: ${message}`;
          }
        }

        const timeMs = (time + Math.random() * 2 + 0.1).toFixed(2);
        
        resolve({
          id: test.id,
          passed,
          input: test.input.map(arg => JSON.stringify(arg)).join(', '),
          output,
          expected: JSON.stringify(test.expected),
          error: errorMsg,
          timeMs
        });
      };
      
      // Iniciamos la ejecución en el Worker
      worker.postMessage({ userCode, reto, test });
    });
  };

  // Ejecutamos todas las pruebas en paralelo usando Promise.all
  const results = await Promise.all(reto.testCases.map(test => runTest(test)));
  
  // Limpiamos el Blob URL para no ocupar memoria RAM
  URL.revokeObjectURL(workerUrl);
  
  return results;
};
