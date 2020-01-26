import React, { useState } from 'react';
import {
  Button,
  Select,
  Row,
  Col,
  message,
  Modal,
  List,
  Typography
} from 'antd';
import AceEditor from 'react-ace';
import path from 'path';
import fs from 'fs';
import { remote } from 'electron';

import parser from '../../Utils/parser';
import { validateTemplate } from '../../Utils/validator';
import createViewFrame from '../../Utils/renderView';

//Temas del editor
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

const { BrowserWindow } = remote;

function Home(props) {
  const [page, setPage] = useState('');
  const [mode, setMode] = useState('json');
  const [modalView, setViewM] = useState(false);

  function onChange(newValue) {
    setPage(newValue);
  }
  function valueJSON() {
    try {
      let parsed = JSON.parse(page);
      let { valid, errors } = validateTemplate(parsed);
      if (valid) {
        createViewFrame(mode, page);
      } else {
        Modal.error({
          title: 'Template no valida',
          content: (
            <List
              header={<div>Stack</div>}
              dataSource={errors}
              renderItem={(item, i) => (
                <List.Item>
                  <Typography.Text mark>[Error {i + 1}]</Typography.Text>
                  {'  '}
                  {item.stack}
                </List.Item>
              )}
            />
          )
        });
      }
    } catch (error) {
      Modal.error({
        title: 'JSON NO VÁLIDO',
        content: error.message
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
          <Button onClick={() => valueJSON()} type="primary">
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
