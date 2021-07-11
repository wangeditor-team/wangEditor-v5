/**
 * @description 处理 dragstart 事件
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'
import { DomEditor } from '../../editor/dom-editor'
import { IDomEditor } from '../../editor/interface'
import TextArea from '../TextArea'
import { hasTarget } from '../helpers'

function handleOnDragstart(e: Event, textarea: TextArea, editor: IDomEditor) {
  const event = e as DragEvent
  if (!hasTarget(editor, event.target)) return

  const node = DomEditor.toSlateNode(editor, event.target)
  const path = DomEditor.findPath(editor, node)
  const voidMatch = Editor.isVoid(editor, node) || Editor.void(editor, { at: path, voids: true })

  // If starting a drag on a void node, make sure it is selected
  // so that it shows up in the selection's fragment.
  if (voidMatch) {
    const range = Editor.range(editor, path)
    Transforms.select(editor, range)
  }

  const data = event.dataTransfer
  if (data == null) return

  textarea.isDraggingInternally = true

  editor.setFragmentData(data)
}

export default handleOnDragstart
