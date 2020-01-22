import React, { useState } from 'react';
import AceEditor from 'react-ace';
import parser from '../../Utils/parser';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

function Home(props) {
  const [page, setPage] = useState('');
  function onChange(newValue) {
    console.log(page);
    setPage(newValue);
  }
  function createBrowserWindow() {
    const html = `<body>${parser(JSON.parse(page).content)}</body>`;
    console.log(html);
    const { remote } = require('electron');
    const { BrowserWindow } = remote;
    const win = new BrowserWindow({
      height: 600,
      width: 800
    });
    console.log(html);
    win.loadURL('data:text/html;charset=utf-8,' + encodeURI(html));
  }
  return (
    <div className="home" style={{ width: '100%', height: '100%' }}>
      <button onClick={createBrowserWindow}>Test</button>
      <AceEditor
        mode="json"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        commands={['children']}
        width="100%"
        enableLiveAutocompletion
        enableSnippets
      />
    </div>
  );
}

export default Home;
