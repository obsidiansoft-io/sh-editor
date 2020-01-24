import React, { useState } from 'react';
import { Button, Select, Row, Col } from 'antd';
import AceEditor from 'react-ace';
import path from 'path';
import fs from 'fs';
import { remote } from 'electron';

import parser from '../../Utils/parser';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
const { BrowserWindow } = remote;

function Home(props) {
  const [page, setPage] = useState('');
  const [mode, setMode] = useState('json');
  let view = null;
  function onChange(newValue) {
    setPage(newValue);
  }
  async function createBrowserWindow() {
    if (mode === 'json') {
      const parsed = parser(JSON.parse(page).content);
      const html = `<html><head><title>Sharabiz Page View</title><meta http-equiv="Content-Security-Policy" content="script-src 'self';"></head><body>${parsed.toString()}</body></html>`;
      fs.writeFile(path.join(__dirname, '../cache/view.html'), html, () => {
        view = new BrowserWindow({
          height: 600,
          width: 800
        });
        view.loadURL(path.join(__dirname, '../cache/view.html'));
      });
    }
  }
  return (
    <div className="home" style={{ width: '100%', height: '100vh' }}>
      <Row type="flex" justify="space-between" style={{ margin: 20 }}>
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
      />
    </div>
  );
}

export default Home;
