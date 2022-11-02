import React, { forwardRef } from 'react';
import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

const TextEditor = forwardRef((props, ref) => {
  //
  return (
    <>
      <Editor
        initialValue={props.value} // 초기 입력값
        previewStyle="horizontal" // vertical로 설정시 미리보기 화면 분할가능
        height="300px"
        initialEditType="markdown" // markdown or wysiwyg
        ref={ref}
        onChange={props.onChange}
        autofocus={false}
        previewHighlight={false}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
