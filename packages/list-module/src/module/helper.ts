/**
 * @description module node helpers
 * @author wangfupeng
 */

import { Node } from 'slate'
import { DomEditor } from '@wangeditor/core'

/**
 * 根据 node.type 获取 html tag
 * @param type node.type
 */
export function genTag(type: string): string {
  if (type === 'bulleted-list') return 'ul'
  if (type === 'numbered-list') return 'ol'
  if (type === 'list-item') return 'li'
  throw new Error(`list type '${type}' is invalid`)
}

/**
 * 判断 node.type 是否是 bulleted-list、numbered-list
 * @param n Node
 */
export function checkList(n: Node): boolean {
  const type = DomEditor.getNodeType(n)
  return ['bulleted-list', 'numbered-list'].includes(type)
}
/**
 * 判断node.type 是否是第一个并且list 是否没有内容
 * @param n 
 * @returns 
 */
export function checkFristList(n: Node): boolean {

  if (checkList(n)) {
    var childList = n.children
    if (childList.length === 1)
      return !childList[0].children[0].text
  }
  return false
}