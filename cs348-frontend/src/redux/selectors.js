export const getResultsState = store => store.search.results;
export const getUserState = store => store.user.userId;
export const getUserFavourites = store => store.user.favourites;
export const getFavouritesFilter = store => store.user.favouritesFilter;
export const getUserName = store => store.user.userName;
export const getResultsOrder = store => { return {'orderBy': store.search.orderBy, 'asc': store.search.asc}; }
export const getStrict = store => store.search.strict;
export const getIngredientsState = store => store.search.ingredients;
export const getPaginationState = store => { return {'pageCount': store.search.pageCount, 'highestPage': store.search.highestPage}; }
