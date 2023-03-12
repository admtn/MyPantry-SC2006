import logo from './logo.svg';
import './App.css';
import './index.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'fixed', bottom: 0, width: '100%' }}>
      <Button text = "Pantry"/>
      <Button text = "Nearby stores"/>
      <Button text = "Profile"/>
    </div>
  );
}

export default App;
