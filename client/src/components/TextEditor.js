import React, { forwardRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const TextEditor = forwardRef((props, ref) => {
  return (
    <>
      <Editor
        initialValue={props.value} // 초기 입력값
        previewStyle="tab" // vertical로 설정시 미리보기 화면 분할가능
        height="300px"
        initialEditType="markdown" // markdown or wysiwyg
        ref={ref}
        onChange={props.onChange}
        autofocus={true}
        previewHighlight={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
      />
    </>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
