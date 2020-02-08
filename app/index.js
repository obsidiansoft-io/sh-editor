import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './Components/Root';
import { message, Modal } from 'antd';
import { configureStore, history } from './Redux/store/configureStore';
import { remote, ipcRenderer as icpR } from 'electron';
import './app.global.less';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const ipcRenderer = remote.ipcRenderer || icpR;
//Actualizacion
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.info('A new update is available. Downloading now...');
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  Modal.confirm({
    onOk: () => {
      ipcRenderer.send('restart_app');
    },
    title: 'Update Downloaded. It will be installed on restart. Restart now?'
  });
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
