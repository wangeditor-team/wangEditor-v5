/**
 * @description link helper
 * @author wangfupeng
 */

import { Editor, Range, Transforms, Node, Text, Path } from 'slate'
import { IDomEditor, DomEditor } from '@wangeditor/core'
import { LinkElement } from './custom-types'

/**
 * 校验 link
 * @param menuKey menu key
 * @param editor editor
 * @param text menu text
 * @param url menu url
 */
function check(menuKey: string, editor: IDomEditor, text: string, url: string): boolean {
  const { checkLink } = editor.getMenuConfig(menuKey)
  if (checkLink) {
    const res = checkLink(text, url)
    if (typeof res === 'string') {
      // 检验未通过，提示信息
      editor.alert(res, 'error')
      return false
    }
    if (res == null) {
      // 检验未通过，不提示信息
      return false
    }
  }

  return true // 校验通过
}

export function isMenuDisabled(editor: IDomEditor): boolean {
  if (editor.selection == null) return true

  const [match] = Editor.nodes(editor, {
    match: n => {
      const type = DomEditor.getNodeType(n)

      if (type === 'pre') return true // 代码块
      if (Editor.isVoid(editor, n)) return true // void node
      if (type === 'link') return true // 当前处于链接之内

      return false
    },
    universal: true,
  })

  if (match) return true
  return false
}
/**
 * 插入 link
 * @param editor editor
 * @param text text
 * @param url url
 */
export function insertLink(editor: IDomEditor, text: string, url: string) {
  if (!url) return
  if (!text) text = url // 无 text 则用 url 代替

  // 检查 maxLength
  if (DomEditor.checkMaxLength(editor, text)) {
    return
  }

  // 还原选区
  editor.restoreSelection()

  if (isMenuDisabled(editor)) return

  // 校验
  const checkRes = check('insertLink', editor, text, url)
  if (!checkRes) return // 校验未通过

  // 判断选区是否折叠
  const { selection } = editor
  if (selection == null) return
  const anchorPath = selection.anchor.path
  const focusPath = selection.focus.path
  let newSelection = JSON.parse(JSON.stringify(selection))
  let anchorNode = Node.get(editor, anchorPath)
  let focusNode = Node.get(editor, focusPath)
  // 设置link的时候过滤掉anchor中末尾的image
  if (Text.isText(anchorNode)) {
    let parentAnchorPath = Path.parent(anchorPath)
    anchorNode = Node.get(editor, parentAnchorPath)
    if (anchorNode.type === 'image') {
      const len = parentAnchorPath.length - 1
      parentAnchorPath[len] = parentAnchorPath[len] - 1
      newSelection.anchor.path = parentAnchorPath
      Transforms.select(editor, newSelection)
    }
  }
  // 设置link的时候过滤掉focus中末尾的image
  if (Text.isText(focusNode)) {
    let parentFocusPath = Path.parent(focusPath)
    focusNode = Node.get(editor, parentFocusPath)
    if (focusNode.type === 'image') {
      const len = parentFocusPath.length - 1
      parentFocusPath[len] = parentFocusPath[len] + 1
      newSelection.focus.path = parentFocusPath
      Transforms.select(editor, newSelection)
    }
  }

  const isCollapsed = Range.isCollapsed(selection)

  // 新建一个 link node
  const linkNode: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text }] : [],
  }

  // 执行：插入链接
  if (isCollapsed) {
    Transforms.insertNodes(editor, linkNode)
  } else {
    Transforms.wrapNodes(editor, linkNode, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

/**
 * 修改 link url
 * @param editor editor
 * @param text text
 * @param url link url
 */
export function updateLink(editor: IDomEditor, text: string, url: string) {
  if (!url) return

  // 校验
  const checkRes = check('updateLink', editor, text, url)
  if (!checkRes) return // 校验未通过

  // 修改链接
  const props: Partial<LinkElement> = { url }
  Transforms.setNodes(editor, props, {
    match: n => DomEditor.checkNodeType(n, 'link'),
  })
}
