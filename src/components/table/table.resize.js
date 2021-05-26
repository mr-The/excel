import {$} from '@core/dom';


export function resizeHandler($root, event, resize) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    let value

    $resizer.css({
      opacity: 1})

    document.onmousemove = e => {
      if (resize === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px',
          height: '100vh'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta +'px',
          width: '100vw'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (resize === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => $(el).css({width: value + 'px'}))
        $resizer.css({opacity: 0,
          right: 0,
          height: '100%'})
      } else {
        $parent.css({height: value + 'px'})
        $resizer.css({opacity: 0,
          bottom: 0,
          width: '100%'})
      }

      resolve({
        id: $parent.data[resize],
        resize,
        value

      })
    }
  })
}