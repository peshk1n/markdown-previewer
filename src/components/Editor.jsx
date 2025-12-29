import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";

export function Editor({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"  
      extensions={[markdown(), EditorView.lineWrapping]}
      theme={githubLight}
      style={{
        flex: 1,
        minHeight: '0',          
        borderRadius: '8px',
        padding: '4px',
        backgroundColor: '#f9f9f9',
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
