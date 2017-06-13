import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import hljs from 'highlight.js'

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
  return md.render(text)
}

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
}).use(emoji)

md.renderer.rules.emoji = (token, idx) => {
  return twemoji.parse(token[idx].content)
}

md.renderer.rules.image = (tokens, idx, options, env, slf) => {
  var token = tokens[idx]

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env)

  token.attrs.push([
    'class',
    'ui image'
  ])
  console.dir(token)

  return slf.renderToken(tokens, idx, options)
}
