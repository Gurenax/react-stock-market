import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud.iexapis.com/v1"
});

export const loadQuotesForStock = symbol => {
  return api.get(`/stock/${symbol}/quote`).then(res => res.data);
};

export const loadLogoForStock = symbol => {
  return api.get(`/stock/${symbol}/logo`).then(res => res.data.url);
};

export const loadRecentNewsForStock = symbol => {
  return api.get(`/stock/${symbol}/news`).then(res => res.data);
};

export const loadChartForStock = (symbol, range) => {
  return api.get(`/stock/${symbol}/chart/${range}`).then(res => res.data);
};
