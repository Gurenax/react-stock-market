import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export const loadQuotesForStock = (symbol) => {
  return api.get(`/stock/${symbol}/quote`)
    .then( res => res.data )
}

export const loadLogoForStock = (symbol) => {
  return api.get(`/stock/${symbol}/logo`)
    .then( res => res.data )
}