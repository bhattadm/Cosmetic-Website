import { useEffect, useState } from 'react';
import { fetchAddToCart, fetchInventoryItemDetails, fetchAddCommentsToItem} from './services';
import ShowComments from './ShowComments';
  const ShowDetailItem = ({ itemId, username }) => {

  const [status, setStatus] = useState('');
  const [detailItem,setDetailItem] = useState({})
  const [isLoading,setIsLoading] = useState(true);
  const [stock,setStock] = useState('');
  const [comments,setComments] = useState([]);
  const [text, setText] = useState('');
  const [isGreyedout, setisGreyedout] = useState(true);
 
  useEffect(() => {   
    renderDetailItem(itemId);
  },[stock]);

  const renderDetailItem = (itemId)=> {
    fetchInventoryItemDetails(itemId)
    .then((detailIteminfo)=>{
      setDetailItem(detailIteminfo);
      setComments(detailIteminfo.comments)
      setIsLoading(false);
      setStock(detailItem.quantity);
      setStatus('');
    })
    .catch((err) => {
      setStatus(err.error);  
      setIsLoading(false);
    });
  }

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const addItemToCart = (itemId)=> {
    fetchAddToCart(username, itemId)
    .then((cartInfo)=> {
      setStatus(' ');
      setIsLoading(false);
      setStock(detailItem.quantity-1);
    })
    .catch((err)=> {
      setStatus(err.error);
      setIsLoading(false);
    })
  }

  const onChange = (e) => {
    setStatus(' ');
    setText(e.target.value);
    setisGreyedout(!e.target.value);
  };

  const addCommentsToItem = (itemId)=> {
    setIsLoading(true);
    fetchAddCommentsToItem(username,itemId,text)
    .then((commentsInfo)=> {
      setComments(commentsInfo);
      setStatus(' ');
      setIsLoading(false);
      setText('');
      setisGreyedout(true);
    })
    .catch((err)=>{
      setStatus(err.error);
      setText('');
      setisGreyedout(true);
      setIsLoading(false);
    })
  }

  const commentList = <ShowComments commentList = {comments}/>

  return (
    <div className = "detail-page">
      { status && <div className ="status">{status}</div> }
      <div className = "detail-heading">
        <h2 className = "details-title"> {detailItem.itemName}</h2>
      </div>
      <div className = "detail-img-box">
        <img className = "detail-image" src={detailItem.image.url} alt="product image"/>
      </div>
      <div className = "details-subtitle"><b>Price:</b>${detailItem.price}</div>
      <div className = "details-subtitle "><b>Quanity:</b>{stock}</div>  
      <div className = "add-tocart-button">
        <button className="to-cart" data-id={detailItem.itemId} onClick={(e) => addItemToCart(e.target.dataset.id)} >Add To Cart</button>
      </div>
      <div className = "comments">
        <div className = "details-subtitle"><b>Comments:</b></div>
        {commentList}
      </div>
      <div className = "send-form">
        <div className = "details-subtitle"><b>Share your views:</b></div>   
        <p></p>
        <textarea rows="5" cols="60" disabled={isLoading} onChange={onChange} value={text} />
        <p></p>
        {isGreyedout || isLoading?
          <button className ="add-comments-button-disabled" data-id={detailItem.itemId} onClick={(e) => addCommentsToItem(e.target.dataset.id)}disabled={isGreyedout || isLoading}>{ isLoading ? "..." :"Add Comment"}</button>:
          <button className ="add-comments-button" data-id={detailItem.itemId} onClick={(e) => addCommentsToItem(e.target.dataset.id)}disabled={isGreyedout || isLoading}>{ isLoading ? "..." : "Add Comment"}</button>}
      </div>
    </div>
  );
};
    
export default ShowDetailItem;