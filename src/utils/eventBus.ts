type Events = (...data: any) => void

export const EventBus = () => {
  const events: {
    [prop: string]: Events[]
  } = {}

  const emit = (name: keyof typeof events, ...data: any) => {
    events[name] &&
      events[name].forEach((e) => {
        e(...data)
      })
  }

  const on = (name: keyof typeof events, callback: Events) => {
    if (events[name]) {
      events[name].push(callback)
    } else {
      events[name] = [callback]
    }
  }

  return {
    emit,
    on
  }
}