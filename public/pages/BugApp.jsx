import bugService from '../services/bugService.js';
import BugEdit from '../components/BugEdit.jsx';
import BugAdd from '../components/BugAdd.jsx';
import BugList from '../components/BugList.jsx';

export default class BugApp extends React.Component {
  state = {
    bugs: null,
    current: null,
    isEdit: false,
  };

  componentDidMount() {
    this.loadBugs();
  }

  loadBugs = () => {
    bugService.query().then((bugs) => {
      this.setState({ bugs });
    });
  };

  onDelete = (bugId) => {
    bugService.remove(bugId);
    this.loadBugs();
  };

  onSave = (bug) => {
    bugService
      .save(bug)
      .then((savedBug) => {
        console.log('Bug Successfuly Saved:', savedBug);
      })
      .catch((err) => console.log('Cannot Add Bug', err));
    this.loadBugs();
    this.setState({ isEdit: false });
  };

  onEdit = (bug) => {
    this.setState({ current: bug, isEdit: true });
  };

  render() {
    const { bugs, current, isEdit } = this.state;
    return (
      <div className='grid-2'>
        <div className='card-form'>
          {isEdit ? (
            <BugEdit current={current} onSave={this.onSave} />
          ) : (
            <BugAdd onSave={this.onSave} />
          )}
        </div>
        <div>
          {bugs && (
            <BugList
              bugs={bugs}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
            />
          )}
        </div>
      </div>
    );
  }
}
