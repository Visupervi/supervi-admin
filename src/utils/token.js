const TOKEN_KEY = "token_key"
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (value) => {
  localStorage.setItem(TOKEN_KEY, value)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}