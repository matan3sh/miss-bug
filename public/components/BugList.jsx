import BugPreview from './BugPreview.jsx';

export default class BugList extends React.Component {
  state = {};

  render() {
    const { bugs, onDelete, onEdit } = this.props;
    return (
      <div>
        {bugs.map((bug) => (
          <BugPreview
            key={bug._id}
            bug={bug}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  }
}
