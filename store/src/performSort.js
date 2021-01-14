export const sort = ({sortDir,list}) => {
  switch (sortDir.type) {
    case 'name-asc':
      return [...list].sort( (a, b) => a[sortDir.name].toLowerCase() >= b[sortDir.name].toLowerCase() ? 1 : -1 );
      break;
    case 'name-desc':
      return [...list].sort( (a, b) => a[sortDir.name].toLowerCase() <= b[sortDir.name].toLowerCase() ? 1 : -1 );
      break;
    case 'high-price':
      return [...list].sort( (a, b) => a[sortDir.name] <= b[sortDir.name] ? 1 : -1 );
      break;
    case 'low-price':
      return [...list].sort( (a, b) => a[sortDir.name] >= b[sortDir.name] ? 1 : -1 );
      break;
    default:
      return [...list];
      break;
  }
};