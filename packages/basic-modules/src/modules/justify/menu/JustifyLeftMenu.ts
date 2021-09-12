/**
 * @description justify left menu
 * @author wangfupeng
 */

import { Transforms, Element, Editor, NodeEntry } from 'slate'
import { DomEditor, IDomEditor, t } from '@wangeditor/core'
import BaseMenu from './BaseMenu'
import { JUSTIFY_LEFT_SVG } from '../../../constants/icon-svg'

class JustifyLeftMenu extends BaseMenu {
  readonly title = t('justify.left')
  readonly iconSvg = JUSTIFY_LEFT_SVG

  exec(editor: IDomEditor, value: string | boolean): void {
    const above = Editor.above(editor) as NodeEntry<Element>
    const aboveType = above?.[0].type
    const selectedTextNode = DomEditor.getSelectedTextNode(editor)
    let setNodeMode: 'highest' | 'lowest' | undefined = 'highest'

    // table 图文下单元格
    if (aboveType === 'table-row') {
      const parentNodePath = DomEditor.findPath(editor, selectedTextNode)
      Transforms.select(editor, {
        path: parentNodePath,
        offset: 0,
      })
      return this.exec(editor, value)
    }
    // table 单元格
    if (aboveType === 'table-cell') setNodeMode = 'lowest'
    // table 多个单元格同时选中
    if (
      aboveType === 'table' ||
      DomEditor.getParentsNodes(editor, selectedTextNode)[0]?.type === 'table-cell'
    ) {
      setNodeMode = undefined
    }

    Transforms.setNodes(
      editor,
      {
        textAlign: 'left',
      },
      {
        match: n => Element.isElement(n),
        mode: setNodeMode,
      }
    )
  }
}

export default JustifyLeftMenu
