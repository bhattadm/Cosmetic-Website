const ShowSort = ({ sortDir, setSortDir}) => {

  const getSelectedValue = (e) => {
    switch (e.target.value) {
      case 'name-asc': {
        setSortDir({ type: 'name-asc', name: 'itemName' })
      }
      break;
      case 'name-desc': {
        setSortDir({ type: 'name-desc', name: 'itemName' })
      }
      break;
      case 'high-price': {
        setSortDir({ type: 'high-price', name: 'price' })
      }
      break;
      case 'low-price': {
        setSortDir({ type: 'low-price', name: 'price' })
      }
      break;
      case 'all': {
        setSortDir({ type: 'all' })
      }
      break;
      default: {
        setSortDir({ type: 'all' })
      }
      break;
    }
  }

  return (
    <div className="sort-display">
      <label className="sort-title">Sort By</label>
      <select className="sort" value={sortDir.type} placeholder="all" onChange={(e) => getSelectedValue(e)} >
        <option value="name-asc">Sort by name asc</option>
        <option value="name-desc">Sort by name des</option>
        <option value="high-price">Sort by high price</option>
        <option value="low-price">Sort by low price</option>
        <option value="all">All</option>
      </select>
    </div>
  )
}

export default ShowSort;
