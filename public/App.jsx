import BugApp from './pages/BugApp.jsx';
import Navbar from './components/Layout/Navbar.jsx';

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <BugApp />
        </div>
      </React.Fragment>
    );
  }
}
