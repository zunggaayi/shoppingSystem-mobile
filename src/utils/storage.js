// 约定一个通用键名
const INFO_KEY = 'zhsc_info'
const HISTOTY_KEY = 'zhsc_history'
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

export const setHistory = (arr) => {
  localStorage.setItem(HISTOTY_KEY, JSON.stringify(arr))
}

export const getHistory = () => {
  const result = localStorage.getItem(HISTOTY_KEY)
  return result ? JSON.parse(result) : []
}
