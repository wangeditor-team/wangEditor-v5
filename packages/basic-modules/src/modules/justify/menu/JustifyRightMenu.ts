/**
 * @description justify right menu
 * @author wangfupeng
 */

import { Transforms, Element } from 'slate'
import { handlePlaceholderStyle, IDomEditor } from '@wangeditor/core'
import BaseMenu from './BaseMenu'
import { JUSTIFY_RIGHT_SVG } from '../../../constants/icon-svg'

class JustifyRightMenu extends BaseMenu {
  readonly title = '右对齐'
  readonly iconSvg = JUSTIFY_RIGHT_SVG

  exec(editor: IDomEditor, value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'right',
      },
      { match: n => Element.isElement(n) }
    )

    handlePlaceholderStyle(editor, 'textAlign', 'right')
  }
}

export default JustifyRightMenu
