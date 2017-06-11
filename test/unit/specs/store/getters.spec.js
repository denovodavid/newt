import * as getters from '@/store/getters'

describe('Getters', () => {
  it('orderedNotes: consecutive', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 2,
      [TEST_KEY_B]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(TEST_KEY_A)
    expect(orderedNotes[0]['.key']).toBe(TEST_KEY_B)
  })

  it('orderedNotes: equal', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 1,
      [TEST_KEY_B]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(orderedNotes[0]['.key'])
  })

  // TODO: Fix this test, it wrong :(
  xit('orderedNotes: undefined or null', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const TEST_KEY_C = 'C'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_C,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 0,
      [TEST_KEY_B]: null,
      [TEST_KEY_C]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(orderedNotes[0]['.key'])
    console.dir(state)
  })

  it('markdown returns correct image', () => {
    const state = {}
    const HREF = 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png'
    const TITLE = 'Logo Title Text 1'
    const ALT_TEXT = 'alt text'
    const INPUT = `![${ALT_TEXT}](${HREF} "${TITLE}")`
    const EXPECTED = `<p><img src="${HREF}" alt="${ALT_TEXT}" title="${TITLE}" class="ui image"></p>\n`
    const ACTUAL = getters.markdown(state)(INPUT)
    expect(ACTUAL).toBe(EXPECTED)
  })

  it('markdown returns correct link', () => {
    const state = {}
    const HREF = 'https://www.google.com'
    const TITLE = 'Google'
    const TEXT = 'Inline-style link with title'
    const INPUT = `[${TEXT}](${HREF} "${TITLE}")`
    const EXPECTED = `<p><a href="${HREF}" title="${TITLE}" target="_blank">${TEXT}</a></p>\n`
    const ACTUAL = getters.markdown(state)(INPUT)
    expect(ACTUAL).toBe(EXPECTED)
  })
})
