import { useEffect, useState } from 'react';
import { fetchInventoryList} from './services';
import ShowInventoryList from './ShowInventoryList';
import ShowDetailItem    from './ShowDetailItem';

const ShowProducts = ({ username,isHome,setIsHome}) => {

  const [inventoryList, setInventoryList] = useState('');
  const [detailPageRender, setDetailPageRender] = useState(false);
  const [status, setStatus] = useState('');
  const [itemId,setitemId] = useState('');


  const displayDetailItem = function(itemId){
    setDetailPageRender(true);
    setIsHome(false);
    setitemId(itemId);
  };

  useEffect(() => {   
      renderInventory({setInventoryList});
  },[]);
    
  const renderInventory = ({setInventoryList}) => {
    fetchInventoryList()
    .then((inventoryList)=>{
      setInventoryList(inventoryList);
      setIsHome(true);
      setStatus('');
    })
    .catch((err) => {  
      setStatus(err.error);   
    });
  }
    
  return (
    <div className = "display-panel"> 
      { status && <div className ="status">{status}</div>}
      <p></p>
      { detailPageRender && !isHome?
        <ShowDetailItem  itemId = {itemId} username = {username}  /> :
        <ShowInventoryList inventoryList = {inventoryList} onDetailItem = {displayDetailItem} username = {username} />  
      }   
    </div>
  );
};

export default ShowProducts;