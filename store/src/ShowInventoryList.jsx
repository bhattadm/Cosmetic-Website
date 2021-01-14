import {useState } from 'react';
import ShowSearch from './ShowSearch';
import ShowSort from './ShowSort';
import {sort} from './performSort';
const ShowInventoryList = ({ 
  inventoryList,
  onDetailItem,
  username,
 }) => {
  
  const [status, setStatus] = useState('');
  const[searchState,setSearchState]=useState('');
  const [sortDir, setSortDir] = useState({type:'all'});
  const [selectedOption, setSelectedOption] = useState('All');

  const onViewDetails = (itemId)=> {
    onDetailItem(itemId);
    setStatus('');
  }

  const toSearch =(searchState)=> {
    setSearchState(searchState);
  }

  const search = <ShowSearch toSearch = {toSearch}/>
  const sortList = <ShowSort sortDir={sortDir} setSortDir={setSortDir} />

  const list = 
  sort({ sortDir: sortDir, list: Object.values(inventoryList) })
  .filter(name => { return name.itemName.toLowerCase().indexOf(searchState.toLowerCase()) >= 0 })
  .map((inventory) => 
    <li className="inventory-item" key={inventory.itemId}>
      <div className ="container-box">   
        <img className = "listImage" src={inventory.image.url} alt="item"/>
        <div className = "item-box-footer">
          <p></p>
          <span className="item-name"> {inventory.itemName}:</span>
          <span className ="item-price">${inventory.price}</span>
        </div>
        <p className = "item-viewdetail">
          <a href="#viewdetail" className = "home-viewdetails" data-id={inventory.itemId} onClick={(e)=>onViewDetails(e.target.dataset.id)}>ViewDetails</a>     
        </p> 
      </div>   
    </li>
  )

  return (  
    <div className="container">
      { status && <div className ="status">{status}</div>}
      {search}
      {sortList}  
      <ul className="subCategory">  
        {list}
      </ul>
    </div>
  );
};
    
export default ShowInventoryList;