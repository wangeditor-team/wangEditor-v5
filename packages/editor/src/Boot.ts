/**
 * @description Editor View class
 * @author wangfupeng
 */

import {
  IDomEditor,

  // 配置
  IEditorConfig,
  IToolbarConfig,

  // 注册菜单
  IRegisterMenuConf,
  registerMenu,

  // 渲染 modal -> view
  IRenderElemConf,
  RenderTextStyleFnType,
  registerTextStyleHandler,
  registerRenderElemConf,

  // to html
  IElemToHtmlConf,
  TextToHtmlFnType,
  TextStyleToHtmlFnType,
  registerTextStyleToHtmlHandler,
  registerTextToHtmlHandler,
  registerElemToHtmlConf,
  ISchema,
  registerSchema,
} from '@wangeditor/core'

type PluginType = <T extends IDomEditor>(editor: T) => T

class Boot {
  constructor() {
    throw new Error('不能实例化\nCan not construct a instance')
  }

  // editor 配置
  static editorConfig: Partial<IEditorConfig> = {}
  static setEditorConfig(newConfig: Partial<IEditorConfig> = {}) {
    this.editorConfig = {
      ...this.editorConfig,
      ...newConfig,
    }
  }
  static simpleEditorConfig: Partial<IEditorConfig> = {}
  static setSimpleEditorConfig(newConfig: Partial<IEditorConfig> = {}) {
    this.simpleEditorConfig = {
      ...this.simpleEditorConfig,
      ...newConfig,
    }
  }

  //toolbar 配置
  static toolbarConfig: Partial<IToolbarConfig> = {}
  static setToolbarConfig(newConfig: Partial<IToolbarConfig> = {}) {
    this.toolbarConfig = {
      ...this.toolbarConfig,
      ...newConfig,
    }
  }
  static simpleToolbarConfig: Partial<IToolbarConfig> = {}
  static setSimpleToolbarConfig(newConfig: Partial<IToolbarConfig> = {}) {
    this.simpleToolbarConfig = {
      ...this.simpleToolbarConfig,
      ...newConfig,
    }
  }

  // 注册插件
  static plugins: PluginType[] = []
  static registerPlugin(plugin: PluginType) {
    this.plugins.push(plugin)
  }

  // 注册 menu
  // TODO 可在注册时传入配置，在开发文档中说明
  static registerMenu(menuConf: IRegisterMenuConf, customConfig?: { [key: string]: any }) {
    registerMenu(menuConf, customConfig)
  }

  // 注册 renderElem
  static registerRenderElem(renderElemConf: IRenderElemConf) {
    registerRenderElemConf(renderElemConf)
  }

  // 注册 renderTextStyle
  static registerRenderTextStyle(fn: RenderTextStyleFnType) {
    registerTextStyleHandler(fn)
  }

  // 注册 elemToHtml
  static registerElemToHtml(elemToHtmlConf: IElemToHtmlConf) {
    registerElemToHtmlConf(elemToHtmlConf)
  }

  // 注册 textToHtml
  static registerTextToHtml(fn: TextToHtmlFnType) {
    registerTextToHtmlHandler(fn)
  }

  // 注册 textStyleToHtml
  static registerTextStyleToHtml(fn: TextStyleToHtmlFnType) {
    registerTextStyleToHtmlHandler(fn)
  }

  static registerSchema(schema: ISchema) {
    registerSchema(schema)
  }
}

export default Boot
