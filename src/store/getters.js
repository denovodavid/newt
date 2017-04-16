import Marked from 'marked'

export const orderedNotes = state => {
  return state.notes.slice(0).sort((a, b) => {
    const aOrder = state.notesOrder[a['.key']]
    const bOrder = state.notesOrder[b['.key']]
    if (aOrder === undefined || aOrder === null) return -1
    if (aOrder === bOrder) return 0
    if (aOrder < bOrder) return -1
    return 1
  })
}

export const markdown = state => text => {
  return Marked(text)
}

let mdRenderer = new Marked.Renderer()
mdRenderer.image = function (href, title, text) {
  return '<p><img src="' + href + '" alt="' + text + '" class="ui image"></p>'
}
mdRenderer.link = function (href, title, text) {
  return '<a href="' + href + '" target="_blank">' + text + '</a>'
}
Marked.setOptions({
  renderer: mdRenderer
})
