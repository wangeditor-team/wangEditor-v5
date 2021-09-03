/**
 * @description render text node
 * @author wangfupeng
 */

import { Text as SlateText, Ancestor, Node, Editor } from 'slate'
import { jsx, VNode } from 'snabbdom'
import { DomEditor } from '../../editor/dom-editor'
import { IDomEditor } from '../../editor/interface'
import { KEY_TO_ELEMENT, NODE_TO_ELEMENT, ELEMENT_TO_NODE } from '../../utils/weak-maps'
import genTextVnode from './genVnode'
import addTextVnodeStyle from './renderStyle'
import { promiseResolveThen } from '../../utils/util'
import { genTextId } from '../helper'

const PLACEHOLDER_SYMBOL = Symbol('placeholder') as unknown as string

function renderText(textNode: SlateText, parent: Ancestor, editor: IDomEditor): VNode {
  if (textNode.text == null)
    throw new Error(`Current node is not slate Text ${JSON.stringify(textNode)}`)
  const key = DomEditor.findKey(editor, textNode)

  // 根据 decorate 将 text 拆分为多个叶子节点 text[]
  const { decorate, placeholder } = editor.getConfig()
  if (decorate == null) throw new Error(`Can not get config.decorate`)
  const path = DomEditor.findPath(editor, textNode)
  const ds = decorate([textNode, path])
  const { isComposing } = DomEditor.getTextarea(editor)
  if (
    placeholder &&
    editor.children.length === 1 &&
    Array.from(Node.texts(editor)).length === 1 &&
    Node.string(editor) === '' &&
    !isComposing
  ) {
    const start = Editor.start(editor, [])
    ds.push({
      [PLACEHOLDER_SYMBOL]: true,
      placeholder,
      anchor: start,
      focus: start,
    })
  }

  const leaves = SlateText.decorations(textNode, ds)

  // 生成 leaves vnode
  const leavesVnode = leaves.map((leafNode, index) => {
    // 生成 placeholder leafNode
    if (leafNode[PLACEHOLDER_SYMBOL]) {
      return (
        <span data-slate-placeholder={true} contenteditable={false}>
          {placeholder}
        </span>
      )
    }

    // 文字和样式
    const isLast = index === leaves.length - 1
    let strVnode = genTextVnode(leafNode, isLast, textNode, parent, editor)
    strVnode = addTextVnodeStyle(leafNode, strVnode)
    // 生成每一个 leaf 节点
    return <span data-slate-leaf>{strVnode}</span>
  })

  // 生成 text vnode
  const textId = genTextId(key.id)
  const vnode = (
    <span data-slate-node="text" id={textId} key={key.id}>
      {leavesVnode /* 一个 text 可能包含多个 leaf */}
    </span>
  )

  // 更新 weak-map
  promiseResolveThen(() => {
    // 异步，否则拿不到 DOM
    const dom = document.getElementById(textId)
    if (dom == null) return
    KEY_TO_ELEMENT.set(key, dom)
    NODE_TO_ELEMENT.set(textNode, dom)
    ELEMENT_TO_NODE.set(dom, textNode)
  })

  return vnode
}

export default renderText
