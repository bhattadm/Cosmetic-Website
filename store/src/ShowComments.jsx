const ShowComments = ({ commentList}) => {
  return (
    <div className = "comments-display">
      <ul>
        {Object.values(commentList).map( (comment,index) => (
          <li key={comment.sender+index}>
            <div className="comments">
              <span className = "commenttext">{comment.sender}:{comment.text}</span>
            </div>
        </li> ) ) }
      </ul>
    </div>
  );
};
    
export default ShowComments;