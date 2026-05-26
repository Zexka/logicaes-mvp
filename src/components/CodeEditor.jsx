import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

import { RotateCcw } from 'lucide-react';

export default function CodeEditor({ code, setCode, onRunCode, onReset }) {
  const onRunCodeRef = useRef(onRunCode);

  // Mantenemos la referencia actualizada siempre que onRunCode cambie
  useEffect(() => {
    onRunCodeRef.current = onRunCode;
  }, [onRunCode]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Interceptar Ctrl + Enter (o Cmd + Enter en Mac)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRunCodeRef.current) {
        onRunCodeRef.current();
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-editor overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1d27] border-b border-gray-800 shrink-0 z-10">
        <span className="text-sm font-medium text-gray-300">JavaScript</span>
        {onReset && (
          <button 
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            title="Restablecer al código original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>
        )}
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            lineHeight: 1.5,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            wordWrap: "on",
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full text-gray-500">
              Cargando editor...
            </div>
          }
        />
      </div>
    </div>
  );
}
