/**
 * @description link entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor/core'
import withLink from './plugin'
import { renderLinkConf } from './render-elem'
import { linkToHtmlConf } from './elem-to-html'
import {
  insertLinkMenuConf,
  updateLinkMenuConf,
  unLinkMenuConf,
  viewLinkMenuConf,
} from './menu/index'

const link: Partial<IModuleConf> = {
  renderElems: [renderLinkConf],
  elemsToHtml: [linkToHtmlConf],
  menus: [insertLinkMenuConf, updateLinkMenuConf, unLinkMenuConf, viewLinkMenuConf],
  editorPlugin: withLink,
  schema: {
    match: /link/,
    rules: {
      refresh: true,
    },
  },
}

export default link
