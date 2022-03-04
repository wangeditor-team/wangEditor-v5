/**
 * @description 显示/隐藏 placeholder
 * @author wangfupeng
 */

import { IDomEditor } from '../editor/interface'
import TextArea from './TextArea'
import $ from '../utils/dom'

/**
 * 处理 placeholder
 * @param textarea textarea
 * @param editor editor
 */
export function handlePlaceholder(textarea: TextArea, editor: IDomEditor) {
  const { placeholder } = editor.getConfig()
  if (!placeholder) return

  const isEmpty = editor.isEmpty()

  // 内容为空，当前不是中文输入状态，且目前未显示 placeholder ，则显示
  if (isEmpty && !textarea.showPlaceholder && !textarea.isComposing) {
    usePlaceholder(textarea, editor, true)
    return
  }

  // 内容不是空，且目前显示着 placeholder ，或当前为中文输入状态，则隐藏
  if ((!isEmpty && textarea.showPlaceholder) || textarea.isComposing) {
    usePlaceholder(textarea, editor, false)
    return
  }
}

/**
 * 设置placeholder是否展现
 * @param textarea textarea
 * @param editor editor
 * @param setPlaceholder boolean
 */
export function usePlaceholder(textarea: TextArea, editor: IDomEditor, setPlaceholder: boolean) {
  const { placeholder } = editor.getConfig()
  if (!placeholder) return

  const isEmpty = editor.isEmpty()
  if (!isEmpty) return

  if (setPlaceholder) {
    if (textarea.$placeholder == null) {
      const $placeholder = $(`<div class="w-e-text-placeholder">${placeholder}</div>`)
      textarea.$textAreaContainer.append($placeholder)
      textarea.$placeholder = $placeholder
    }
    textarea.$placeholder.show()
    textarea.showPlaceholder = true // 记录
  }

  if (!setPlaceholder) {
    if (textarea.showPlaceholder) {
      textarea.$placeholder?.hide()
      textarea.showPlaceholder = false // 记录
    }
  }
}
