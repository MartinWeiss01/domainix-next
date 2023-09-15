export const globalFetcher = (url: string, args?: any) => fetch(
  url, args)
  .then(res => {
    if (!res.ok) throw new Error('An error occurred while fetching the data.')
    return res.json();
  })