import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(event) {
    const resize = event.target.dataset.resize
    if (resize) {
      resizeHandler(this.$root, event, resize)
    }
  }
}