const UserPreview = ({ user }) => {
  return (
    <div className='card grid-1 text-center'>
      <i className='fas fa-user-circle fa-5x text-dark'></i>
      <p>{user.username}</p>
      <button className='btn btn-info'>
        <i className='fas fa-info-circle'></i>
      </button>
      <button className='btn btn-danger m'>
        <i className='fas fa-trash'></i>
      </button>
    </div>
  );
};

export default UserPreview;
