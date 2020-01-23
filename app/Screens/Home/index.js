import React, { useState } from 'react';
import { Button, Select, Row, Col } from 'antd';
import AceEditor from 'react-ace';
import parser from '../../Utils/parser';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

function Home(props) {
  const [page, setPage] = useState('');
  const [mode, setMode] = useState('json');
  function onChange(newValue) {
    setPage(newValue);
  }
  async function createBrowserWindow() {
    const parsed = parser(JSON.parse(page).content);
    const html = `<head><title>Sharabiz Page View</title><meta http-equiv="Content-Security-Policy" content="script-src 'self';"></head><body><div>${parsed.toString()}</div></body>`;
    const { remote } = require('electron');
    const { BrowserWindow } = remote;
    const win = new BrowserWindow({
      height: 600,
      width: 800
    });
    win.loadURL('data:text/html;charset=utf-8,' + encodeURI(html));
  }
  return (
    <div className="home" style={{ width: '100%', height: '100vh' }}>
      <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
        <Col>
          <span>Mode:</span>
          <Select
            style={{ width: 100 }}
            value={mode}
            onSelect={e => setMode(e)}
          >
            <Select.Option value="json">JSON</Select.Option>
            <Select.Option value="html">HTML</Select.Option>
          </Select>
        </Col>
        <Col>
          <Button onClick={createBrowserWindow} type="primary">
            Run
          </Button>
        </Col>
      </Row>
      <AceEditor
        mode={mode}
        theme="monokai"
        onChange={onChange}
        value={page}
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
