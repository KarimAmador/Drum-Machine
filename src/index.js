import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const audioList = [
  {
    name: 'Heater-1',
    key: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {
    name: 'Heater-2',
    key: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
  {
    name: 'Heater-3',
    key: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
  {
    name: 'Heater-4',
    key: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
  {
    name: 'Clap',
    key: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
  {
    name: 'Open-HH',
    key: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  {
    name: 'Kick-n-Hat',
    key: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
  {
    name: 'Kick',
    key: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
  {
    name: 'Closed-HH',
    key: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}
];

// const padActive = {
//   boxShadow: '3px 2px 22px 1px rgba(255, 0, 0, 0.24)',
//   backgroundColor: '#ff0000',
//   color: '#fff'
// };

// const padInactive = {border: '1px solid #000'};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipVolume: 40
    };
    this.volumeControl = this.volumeControl.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      if (!audioList.some(audio => event.key.toUpperCase() === audio.key)) {
        return;
      }
      const audio = document.getElementById(event.key.toUpperCase());
      audio.parentElement.click();
    });
  }
  
  volumeControl(e) {
    this.setState({clipVolume: e.target.value})
    const audioClips = document.querySelectorAll('.clip');
    audioClips.forEach(audioEl => {
      audioEl.volume = this.state.clipVolume / 100;
    })
  }
  
  render() {
    return (
      <div id='drum-machine' className="App">
        <Controls volumeControl={this.volumeControl} clipVolume={this.state.clipVolume} />
        <Drums />
      </div>
    );
  }
}

function Controls(props) {
  return (
    <div className='controls'>
      <div id='display'></div>
      <input id="volumeSlider" type="range" min='0' max='100' onChange={props.volumeControl} value={props.clipVolume} />
    </div>
  )
}

function Drums() {
  return (
    <div id='drums'>
      {audioList.map((audio) => (
        <DrumPad audio={audio} key={audio.key}/>
      ))}
    </div>
  )
}

function DrumPad(props) {
  const activatePad = (pad) => {
    pad.classList.contains('inactive') ? pad.classList.replace('inactive', 'active') : pad.classList.replace('active', 'inactive');
  }

  const handleInteraction = () => {
    const audio = document.getElementById(props.audio.key);
    audio.currentTime = 0;
    audio.play();
    activatePad(audio.parentElement);
    setTimeout(() => {
      activatePad(audio.parentElement);
    }, 100)
    const display = document.getElementById('display');
    display.textContent = audio.parentElement.id;
  };

  return (
    <div
      className='drum-pad inactive'
      id={props.audio.name}
      style={{ userSelect: 'none' }}
      onClick={handleInteraction}
    >
      <audio className="clip" id={props.audio.key} src={props.audio.url} />
      {props.audio.key}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );