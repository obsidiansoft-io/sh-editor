import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

function Home(props) {
  function onChange(newValue) {
    console.log('change', newValue);
  }
  return (
    <div className="home" style={{ width: '100%', height: '100%' }}>
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
