import Noty from 'noty'

Noty.overrideDefaults({
  type: 'alert',
  layout: 'topRight',
  theme: 'mint',
  text: '',
  timeout: 5000,
  progressBar: true,
  closeWith: ['click'],
  id: false,
  force: false,
  queue: 'global',
  killer: false,
  container: false,
  buttons: [],
  callbacks: {}
})

export const notify = (type = 'alert', { name, message }) => {
  const notification = new Noty({
    type,
    text: `<strong>${name}</strong><br>${message}`
  })
  return {
    show () {
      notification.show()
    },
    close () {
      notification.close()
    }
  }
}

export const notifyError = error => notify('error', error)
export const notifySuccess = success => notify('success', success)
export const notifyWarning = warning => notify('warning', warning)
export const notifyInfo = info => notify('info', info)

export default notify
