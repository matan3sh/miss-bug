export default class BugEdit extends React.Component {
  state = {
    _id: this.props.current._id,
    title: this.props.current.title,
    description: this.props.current.description,
    severity: this.props.current.severity,
    creator: this.props.current.creator.nickname,
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { _id, title, description, severity } = this.state;
    const bug = {
      _id,
      title,
      description,
      severity,
      createdAt: Date.now(),
      creator: { nickname: this.state.creator },
    };
    this.props.onSave(bug);
  };

  render() {
    const { title, description, severity, creator } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h2 className='text-dark'>Edit Bug</h2>
        <input
          type='text'
          placeholder='Username'
          name='creator'
          value={creator}
          onChange={this.onChange}
        />
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={this.onChange}
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={description}
          onChange={this.onChange}
        />
        <h5>Severity: {severity}</h5>
        <input
          type='range'
          name='severity'
          min='1'
          max='5'
          step='1'
          value={severity}
          onChange={this.onChange}
        />
        <button className='btn btn-primary btn-block'>Update</button>
      </form>
    );
  }
}
