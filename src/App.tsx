import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Greeting name={"Marry"}/>
    </div>
  );
}

export default App;





// STEP 5: What if I could just useState
export function Greeting(props: GreetingProps) {
  const [name, setName] = React.useState("Marry");
  
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  
  return (
    <section>
      <Row label="Name">
      <input
        value={name}
        onChange={handleNameChange}
      />
      </Row>
    </section>
  );
}





// STEP 4: They are related, put them toggether, where do i get them from?
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = ???
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Name">
//       <input
//         value={name}
//         onChange={handleNameChange}
//       />
//       </Row>
//     </section>
//   );
// }





// STEP 3: Not sure how to do it in functional component
// export function Greeting(props: GreetingProps) {
//   const name = ???
//   const setName = ???
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Name">
//       <input
//         value={name}
//         onChange={handleNameChange}
//       />
//       </Row>
//     </section>
//   );
// }





// STEP 2: Make persons name editable
export interface GreetingState {
  name: string;
}

// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry"
//     }
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   render() {
//     return (
//       <section>
//         <Row label="Name">
//           <input
//             value={this.state.name}
//             onChange={this.handleNameChange}
//           />
//         </Row>
//       </section>
//     );
//   }
// }





// STEP 1: Render a persons name
export interface GreetingProps {
  name: string;
}

// export function Greeting(props: GreetingProps) {
//   return (
//     <section>
//       <Row label="Name">
//         {props.name}
//       </Row>
//     </section>
//   );
// }

export interface RowProps {
  label: string;
  children: React.ReactNode
}

export function Row(props: RowProps) {
  return (
    <>
      <h1>{props.label}</h1>
      <p>{props.children}</p>
    </>
  );
}