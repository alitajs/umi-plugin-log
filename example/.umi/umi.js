import './polyfills';
import history from './history';

import React from 'react';
import ReactDOM from 'react-dom';
import findRoute from '/Users/xiaohuoni/.config/yarn/global/node_modules/umi-build-dev/lib/findRoute.js';


// runtime plugins
const plugins = require('umi/_runtimePlugin');
window.g_plugins = plugins;
plugins.init({
  validKeys: ['patchRoutes','render','rootContainer','modifyRouteProps','onRouteChange','initialProps',],
});



// render
let clientRender = async () => {
  window.g_isBrowser = true;
  let props = {};
  // Both support SSR and CSR
  if (window.g_useSSR) {
    // 如果开启服务端渲染则客户端组件初始化 props 使用服务端注入的数据
    props = window.g_initialData;
  } else {
    const pathname = location.pathname;
    const activeRoute = findRoute(require('@tmp/router').routes, pathname);
    if (activeRoute && activeRoute.component) {
      props = activeRoute.component.getInitialProps ? await activeRoute.component.getInitialProps() : {};
    }
  }
  const rootContainer = plugins.apply('rootContainer', {
    initialValue: React.createElement(require('./router').default, props),
  });
  ReactDOM[window.g_useSSR ? 'hydrate' : 'render'](
    rootContainer,
    document.getElementById('root'),
  );
};
const render = plugins.compose('render', { initialValue: clientRender });

// client render
if (__IS_BROWSER) {
  const moduleBeforeRendererPromises = [];

  Promise.all(moduleBeforeRendererPromises).then(() => {
    render();
  }).catch((err) => {
    window.console && window.console.error(err);
  });
}

// export server render
let serverRender, ReactDOMServer;
if (!__IS_BROWSER) {
  serverRender = async (ctx) => {
    const pathname = ctx.req.url;
    require('@tmp/history').default.push(pathname);
    let props = {};
    const activeRoute = findRoute(require('./router').routes, pathname) || false;
    if (activeRoute && activeRoute.component.getInitialProps) {
      props = await activeRoute.component.getInitialProps(ctx);
      props = plugins.apply('initialProps', {
         initialValue: props,
      });
    } else {
      // message activeRoute not found
      console.log(`${pathname} activeRoute not found`);
    }
    const rootContainer = plugins.apply('rootContainer', {
      initialValue: React.createElement(require('./router').default, props),
    });
    const htmlTemplateMap = {
      
    };
    return {
      htmlElement: htmlTemplateMap[pathname],
      rootContainer,
    };
  }
  // using project react-dom version
  // https://github.com/facebook/react/issues/13991
  ReactDOMServer = require('react-dom/server');
}

export { ReactDOMServer };
export default __IS_BROWSER ? null : serverRender;



// hot module replacement
if (__IS_BROWSER && module.hot) {
  module.hot.accept('./router', () => {
    clientRender();
  });
}
