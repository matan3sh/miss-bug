export default class BugForm extends React.Component {
  state = {
    bug: {
      title: '',
      description: '',
      severity: 0,
      creator: '',
    },
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => {
      return {
        bug: {
          ...prevState.bug,
          [field]: value,
        },
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, severity } = this.state.bug;
    let bug = {
      title,
      description,
      severity,
      creator: { nickname: this.state.bug.creator },
    };
    this.props.onSave(bug);
  };

  render() {
    const { title, description, severity, creator } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h2 className='text-dark'>Add Bug</h2>
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
        <h5>Severity</h5>
        <input
          type='range'
          name='severity'
          min='1'
          max='5'
          step='1'
          value={severity}
          onChange={this.onChange}
        />
        <button className='btn btn-primary btn-block'>Submit</button>
      </form>
    );
  }
}