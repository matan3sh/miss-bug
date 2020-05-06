export default function BugPreview({ bug, onDelete, onEdit, user }) {
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {bug.title}
        <span
          className={`badge badge-${bug.severity > 3 ? 'danger' : 'success'}`}
          style={{ float: 'right' }}
        >
          {bug.severity}
        </span>
        <ul className='list'>
          <li className='desc'>{bug.description}</li>
        </ul>
      </h3>
      <span className='created-at text-grey'>
        <span className='text-black'>BUG #{bug._id}</span> last updated by
        <span className='text-black'> {bug.creator.nickname}</span> on{' '}
        {new Date(bug.createdAt).toDateString()}
      </span>
      {user.username === bug.creator.nickname || user.isAdmin ? (
        <p className='my-1'>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => {
              onEdit(bug);
            }}
          >
            Edit
          </button>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => onDelete(bug._id)}
          >
            Delete
          </button>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
