# umi-plugin-log

[![NPM version](https://img.shields.io/npm/v/umi-plugin-log.svg?style=flat)](https://npmjs.org/package/umi-plugin-log)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-log.svg?style=flat)](https://npmjs.org/package/umi-plugin-log)

umi event-class-api 简单的展示umi的生命周期

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-log',  {
      locale:'zh'|'en',
      eventApiExclude:['onStart','beforeDevServer','onOptionChange'] | false,
      applicationApiExclude:[] | false
    }],
  ],
}
```

```
default option {
  locale:'zh',
  eventApiExclude:[],
  applicationApiExclude:[]
}
```

## eventApiExclude

https://umijs.org/plugin/develop.html#event-class-api

## applicationApiExclude

https://umijs.org/plugin/develop.html#application-class-api

![image](https://user-images.githubusercontent.com/11746742/61194226-ca6dca00-a6f2-11e9-87c9-7ff046668c13.png)

## LICENSE

MIT
