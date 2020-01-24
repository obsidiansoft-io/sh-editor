import React, { useState } from 'react';
import { Button, Select, Row, Col } from 'antd';
import AceEditor from 'react-ace';
import path from 'path';
import fs from 'fs';
import { remote } from 'electron';

import parser from '../../Utils/parser';
import createViewFrame from '../../Lib/renderView';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
const { BrowserWindow } = remote;

function Home(props) {
  const [page, setPage] = useState('');
  const [mode, setMode] = useState('json');

  function onChange(newValue) {
    setPage(newValue);
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
          <Button onClick={() => createViewFrame(mode, page)} type="primary">
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
