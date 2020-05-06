const { Link } = ReactRouterDOM;

const UserPreview = ({ user, onDelete }) => {
  return (
    <div className='card grid-1 text-center'>
      <i className='fas fa-user-circle fa-5x text-dark'></i>
      <p>{user.username}</p>
      <Link to={`/users/${user._id}`}>
        <button className='btn btn-info'>
          <i className='fas fa-info-circle'></i>
        </button>
      </Link>
      <button className='btn btn-danger m' onClick={() => onDelete(user._id)}>
        <i className='fas fa-trash'></i>
      </button>
    </div>
  );
};

export default UserPreview;
