import React, { forwardRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const TextEditor = forwardRef((props, ref) => {
  return (
    <>
      <Editor
        initialValue="Please type here..." // 초기 입력값 설정
        previewStyle="tab" // vertical로 설정시 미리보기 화면 분할가능
        height="300px"
        initialEditType="markdown" // markdown or wysiwyg
        ref={ref}
        onChange={props.onChange} // 부모 컴포넌트에서 ref, props 설정
        // (e.g. <TextEditor ref={editorRef} onChange={getHTML}/>
      />
    </>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
