const ShowSearch = ({ toSearch }) => {

  const onChange = (e) => {
    toSearch(e.target.value)
  };
  
  return (
    <div className="search-display">
      <span className ="search-info">
        <input className="search" placeholder="search by name" onChange={(e) => onChange(e)}></input>
      </span>
    </div>
  )
}

export default ShowSearch;