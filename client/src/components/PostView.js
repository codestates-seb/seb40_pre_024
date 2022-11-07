import Prism from 'prismjs';
import React from 'react';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

export default function PostView({ markdown }) {
  return (
    <>
      <Viewer
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        initialValue={markdown}
        //주석을 짱짱으로 추가합니다
      />
    </>
  );
}
