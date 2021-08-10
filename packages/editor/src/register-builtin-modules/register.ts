/**
 * @description 注册 module
 * @author wangfupeng
 */

import Boot from '../Boot'
import { IModuleConf } from '@wangeditor/core'

function registerModule(module: Partial<IModuleConf>) {
  const {
    menus,
    renderElems,
    renderTextStyle,
    elemsToHtml,
    textToHtml,
    textStyleToHtml,
    editorPlugin,
    schema,
  } = module

  if (menus) {
    menus.forEach(menu => Boot.registerMenu(menu))
  }
  if (renderElems) {
    renderElems.forEach(renderElemConf => Boot.registerRenderElem(renderElemConf))
  }
  if (renderTextStyle) {
    Boot.registerRenderTextStyle(renderTextStyle)
  }
  if (elemsToHtml) {
    elemsToHtml.forEach(elemToHtmlConf => Boot.registerElemToHtml(elemToHtmlConf))
  }
  if (textToHtml) {
    Boot.registerTextToHtml(textToHtml)
  }
  if (textStyleToHtml) {
    Boot.registerTextStyleToHtml(textStyleToHtml)
  }
  if (editorPlugin) {
    Boot.registerPlugin(editorPlugin)
  }
  if (schema) {
    Boot.registerSchema(schema)
  }
}

export default registerModule
