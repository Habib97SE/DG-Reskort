import Button from 'react-bootstrap/Button';
import './App.css';
import FormValidation from './FormValidation';

const createTextFile = () => {
  return "created .txt file";
}

const updateTextFile = (data) => {
  return "data: " + data;
}


function App() {
  return (
    <>
    <FormValidation />
    <Button  />
    <div>
      <h1>Lägg till en ny kund:</h1>
      <p>Du kan använda formuläret nedan för att lägga till nya kunder.</p>
      <p>När du är klar, kan du klicka på <b>Ladda ner</b> för att skapa .txt filen. </p>
      <form>
        <div className='form-control'>
        <label>Kundnumbber: </label>
        <input type='text' placeholder='e.g. 2039294' />
        </div>
        <div className='form-control'>
        <label>Namn (För- och efternamn): </label>
        <input type='text' placeholder='ex. Johan Johansson' />
        </div>
        <div className='form-control'>
        <label>Utgångsdatum: </label>
        <input type='text' placeholder='ex. 2023-07-18' />
        </div>
        <div className='form-control'>
          <input type='submit' value='Lägg till' />
        </div>
      </form>
    </div>
    <div>
      <div className='box'>
        <ul>
        <li>Kundnummer: 25844854</li>
          <li>Namn: Hello world</li>
          <li>Utgångsdatum: 2023-07-18</li>
          <li><button>Redigera</button></li>
          <li><button>Radera</button></li>
        </ul>
      </div>
      <div className='box'>
        <ul>
        <li>Kundnummer: 25844854</li>
          <li>Namn: Hello world</li>
          <li>Utgångsdatum: 2023-07-18</li>
          <li><button>Redigera</button></li>
          <li><button>Radera</button></li>
        </ul>
      </div>
      <div className='box'>
        <ul>
        <li>Kundnummer: 25844854</li>
          <li>Namn: Hello world</li>
          <li>Utgångsdatum: 2023-07-18</li>
          <li><button>Redigera</button></li>
          <li><button>Radera</button></li>
        </ul>
      </div>
      <div className='box'>
        <ul>
        <li>Kundnummer: 25844854</li>
          <li>Namn: Hello world</li>
          <li>Utgångsdatum: 2023-07-18</li>
          <li><button>Redigera</button></li>
          <li><button>Radera</button></li>
        </ul>
      </div>
      <div>
        <button>Ladda ner</button>
      </div>
    </div>
    </>
  );
}

export default App;