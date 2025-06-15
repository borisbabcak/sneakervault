const FAVORITES_KEY = 'sneaker_favorites';

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavorite = (sneakerId) => {
  const favorites = getFavorites();
  const newFavorites = favorites.includes(sneakerId)
    ? favorites.filter(id => id !== sneakerId)
    : [...favorites, sneakerId];
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};

export const isFavorite = (sneakerId) => {
  const favorites = getFavorites();
  return favorites.includes(sneakerId);
}; 