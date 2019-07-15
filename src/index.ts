// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-plugin-types';

export interface IOption {
  locale?: 'zh' | 'en';
  eventApiExclude: [] | boolean;
  applicationApiExclude: [] | boolean;
}
export function excludeApi(api, list) {
  return list.includes(api);
}
export default function (api: IApi, option = {} as IOption) {
  api.log.success("insert umi event-class-api");
  const { locale = 'zh', eventApiExclude = [], applicationApiExclude = [] } = option;
  if (eventApiExclude) {
    const umiEventClassApi = [
      {
        name: 'beforeDevServer',
        zh: 'dev server 启动之前',
        en: 'Before dev server start'
      },
      {
        name: 'afterDevServer',
        zh: 'dev server 启动之后',
        en: 'After dev server start'
      },

      {
        name: 'onStart',
        zh: 'umi dev 或者 umi build 开始时触发',
        en: 'Triggered when umi dev or umi build start'
      },
      {
        name: 'onDevCompileDone',
        zh: 'umi dev 编译完成后触发',
        en: 'Triggered after umi dev compilation is complete'
      },
      {
        name: 'onOptionChange',
        zh: '插件的配置改变的时候触发',
        en: 'Triggered when the configuration of the plugin changes'
      },
      {
        name: 'beforeBuildCompileAsync',
        zh: '在 Umi 调用 af-webpack/build 进行一次构建之前',
        en: 'Before Umi call af-webpack/build for a compilation'
      },
      {
        name: 'onBuildSuccess',
        zh: '在 umi build 成功时候。主要做一些构建产物的处理',
        en: 'When the umi build was successful. Mainly do some processing of the construction products'
      },
      {
        name: 'onBuildFail',
        zh: '在 umi build 失败的时候',
        en: 'When the umi build failed'
      },
      {
        name: 'onBuildSuccessAsync',
        zh: 'onBuildSuccess 的异步版',
        en: 'The async version of onBuildSuccess'
      },
      {
        name: 'onHTMLRebuild',
        zh: '当 HTML 重新构建时被触发',
        en: 'Triggered when the HTML is rebuilt'
      },
      {
        name: 'onGenerateFiles',
        zh: 'The routing file is triggered when the entry file is generated',
        en: '路由文件，入口文件生成时被触发'
      },
      {
        name: 'onPatchRoute',
        zh: '获取单个路由的配置时触发，可以在这里修改路由配置 route。比如可以向 Routes 中添加组件路径使得可以给路由添加一层封装',
        en: 'Triggered when getting the configuration of a single route, you can modify the route configuration route here. For example, you can add a component path to Routes to add a layer of encapsulation to the route'
      },
    ];
    umiEventClassApi.forEach(i => {
      if (!excludeApi(i.name, eventApiExclude)) {
        api[i.name](() => {
          api.log.success(i.name);
          api.log.success(locale === 'zh' ? i.zh : i.en);
        });
      }
    });
  }
  if (applicationApiExclude) {
    const umiApplicationClassApi = [
      {
        name: 'modifyDefaultConfig',
        zh: '设置 umi 的默认配置',
        en: 'set umi default configuration'
      },
      {
        name: 'addPageWatcher',
        zh: '添加 watch 的文件',
        en: 'add watching files'
      }, {
        name: 'addHTMLMeta',
        zh: '在 HTML 中添加 meta 标签',
        en: 'add meta in HTML'
      },
      {
        name: 'addHTMLLink',
        zh: '在 HTML 中添加 Link 标签',
        en: 'add link in HTML'
      },
      {
        name: 'addHTMLStyle',
        zh: '在 HTML 中添加 Style 标签',
        en: 'add tyle in HTML'
      },
      {
        name: 'addHTMLScript',
        zh: '在 HTML 尾部添加脚本',
        en: 'Add a script at the bottom of the HTML'
      },
      {
        name: 'addHTMLHeadScript',
        zh: '在 HTML 头部添加脚本',
        en: 'Add a script to the HTML head'
      },
      {
        name: 'modifyHTMLChunks',
        zh: '修改 chunks，默认值是 [\'umi\']',
        en: 'Modify chunks in HTML, default [\'umi\']'
      },

      {
        name: 'modifyHTMLWithAST',
        zh: '修改 HTML，基于 cheerio',
        en: 'Modify the HTML, based on cheerio'
      },


      {
        name: 'modifyHTMLContext',
        zh: '修改 html ejs 渲染时的环境参数',
        en: 'Modify the environment parameters when html ejs is rendered'
      },
      {
        name: 'modifyRoutes',
        zh: '修改路由配置',
        en: 'Modify the routing configuration'
      },
      {
        name: 'addEntryImportAhead',
        zh: '在入口文件在最上面 import 模块',
        en: 'add import at the top of the entry file'
      },
      {
        name: 'addEntryPolyfillImports',
        zh: 'Same as addEntryImportAhead, but as a polyfill, so add it first',
        en: '同 addEntryImportAhead，但作为 polyfill，所以添加在最前面'
      },
      {
        name: 'addEntryImport',
        zh: '在入口文件中 import 模块',
        en: 'Import module in the entry file'
      },
      {
        name: 'addEntryCodeAhead',
        zh: '在 render 之前添加代码',
        en: 'Add code before render'
      },
      {
        name: 'addEntryCode',
        zh: '在 render 之后添加代码',
        en: 'Add code after render'
      },

      {
        name: 'addRouterImport',
        zh: '在路由文件中添加模块引入',
        en: 'Add a module import to the routing file'
      },

      {
        name: 'addRouterImportAhead',
        zh: '在路由文件头部添加模块引入',
        en: 'Add a module to the header of the routing file to introduce'
      },
      {
        name: 'addRendererWrapperWithComponent',
        zh: '在 外面包一层组件',
        en: 'Wrapper a component outside the '
      },
      {
        name: 'addRendererWrapperWithModule',
        zh: '在挂载 前执行一个 Module，支持异步',
        en: 'Excute a module before mount'
      },
      {
        name: 'addUmiExports',
        zh: '支持 umi 添加导出',
        en: 'add some import from \'umi\''
      },
      {
        name: 'modifyEntryRender',
        zh: 'modifyEntryRender???',
        en: 'modifyEntryRender'
      },
      {
        name: 'modifyEntryHistory',
        zh: 'modifyEntryHistory???',
        en: 'modifyEntryHistory???'
      },
      {
        name: 'modifyRouteComponent',
        zh: 'modifyRouteComponent???',
        en: 'modifyRouteComponent???'
      },
      {
        name: 'modifyRouterRootComponent',
        zh: 'modifyRouterRootComponent???',
        en: 'modifyRouterRootComponent???'
      },
      {
        name: 'modifyWebpackConfig',
        zh: '修改 webpack 配置',
        en: 'modify webpack Configuration'
      },
      {
        name: 'modifyAFWebpackOpts',
        zh: '修改 af-webpack 配置',
        en: 'Modify the af-webpack configuration'
      }, {
        name: 'addMiddleware',
        zh: '往开发服务器后面添加中间件',
        en: 'Append middleware to the dev server'
      }, {
        name: 'addMiddlewareAhead',
        zh: '往开发服务器前面添加中间件',
        en: 'Add middleware to the front of the development server'
      }, {
        name: 'addMiddlewareBeforeMock',
        zh: '在 mock 前添加中间件',
        en: 'Add middleware before the mock'
      }, {
        name: 'addMiddlewareAfterMock',
        zh: '在 mock 后添加中间件',
        en: 'Add middleware after the mock'
      }, {
        name: 'addVersionInfo',
        zh: '添加版本信息，在 umi -v 或 umi version 时显示',
        en: 'Added version information, displayed in umi -v or umi version'
      }, {
        name: 'addRuntimePlugin',
        zh: '添加运行时插件，参数为文件的绝对路径',
        en: 'Add a runtime plugin with parameters as the absolute path to the file'
      },
      // {
      //   name: 'addRuntimePluginKey',
      //   zh: '添加运行时可配置项',
      //   en: 'Add a runtime configurable item'
      // },
    ]
    umiApplicationClassApi.forEach(a => {
      if (!excludeApi(a.name, applicationApiExclude)) {
        api[a.name]((memo) => {
          api.log.success(a.name);
          api.log.success(locale === 'zh' ? a.zh : a.en);
          return memo;
        });
      }
    });
  }

};
