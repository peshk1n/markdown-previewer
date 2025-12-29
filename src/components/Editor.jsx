import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { monokaiDimmed } from "@uiw/codemirror-theme-monokai-dimmed";

export function Editor({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"  
      extensions={[markdown(), EditorView.lineWrapping]}
      theme={monokaiDimmed}
      style={{
        flex: 1,
        minHeight: '0',          
        borderRadius: '8px',
        padding: '4px',
        backgroundColor: '#2d2a2e',
        outline: 'none'
      }}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
      }}
    />
  );
}
