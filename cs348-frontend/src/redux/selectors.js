export const getResultsState = store => store.search.results;
export const getUserState = store => store.user.userId;
export const getUserFavourites = store => store.user.favourites;
export const getUserName = store => store.user.userName;
export const getResultsOrder = store => { return {'orderBy': store.search.orderBy, 'asc': store.search.asc}; }
