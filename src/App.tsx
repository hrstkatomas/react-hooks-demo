import React from 'react';
import { ThemeContext, LocaleContext} from './context';

const App: React.FC = () => {
  return (
    <div className="App">
      <Greeting name={"Marry"}/>
    </div>
  );
}

export default App;






// STEP 16: Further extraction
// Comparison, hooks gives you ability to create custom abstractions that do not inflate react component tree and avoid the wrapper hell
export function Greeting(props: GreetingProps) {
  const name = useFormInput("Marry");
  const surname = useFormInput("Poppins");
  const theme: string = React.useContext(ThemeContext);
  const locale: React.ReactElement = React.useContext(LocaleContext);
  const width = useWindowWidth();
  useDocumentTitle(`${name.value} ${surname.value}`);
  
  return (
    <section className={theme}>
      <Row label="Name">
        <input {...name} />
      </Row>
      <Row label="Surname">
      <input {...surname} />
      </Row>
      <Row label="Surname">
        {locale}
      </Row>
      <Row label="Width">
        {width}
      </Row>
    </section>
  );
}

function useFormInput(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

function useDocumentTitle(title: string) {
  React.useEffect(() => {
    document.title = title;
  })
}

function useWindowWidth() {
  const [width, setWidht] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidht(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}





// STEP 15: Hook calls are just function calls, components are just functions
// How do you extract it? You use another function
// This function is called custom hook, convention is: names start with "use" due to linting and indicating statefullness
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
//   const [surname, setSurname] = React.useState("Poppins");
//   const theme: string = React.useContext(ThemeContext);
//   const locale: React.ReactElement = React.useContext(LocaleContext);
//   const width = useWindowWidth();

//   React.useEffect(() => {
//     document.title = `${name} ${surname}`;
//   })
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }

//   function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSurname(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         {locale}
//       </Row>
//       <Row label="Width">
//         {width}
//       </Row>
//     </section>
//   );
// }

// function useWindowWidth() {
//   const [width, setWidht] = React.useState(window.innerWidth);
//   React.useEffect(() => {
//     const handleResize = () => setWidht(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//   return width;
// }




// STEP 14: How do we do this with hooks?
// subscribing to the window width event is conceptially different thing, so we can separate it to another useEffect hook
// also cleaning up is conceptually part of this effect, so effect has a cleanup phase
// use effect will resubscribe on every rerender so there is an optional parameter dependency parameter to specify when to run it again
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
//   const [surname, setSurname] = React.useState("Poppins");
//   const theme: string = React.useContext(ThemeContext);
//   const locale: React.ReactElement = React.useContext(LocaleContext);

//   React.useEffect(() => {
//     document.title = `${name} ${surname}`;
//   })

//   const [width, setWidht] = React.useState(window.innerWidth);
//   React.useEffect(() => {
//     const handleResize = () => setWidht(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [])
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }

//   function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSurname(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         {locale}
//       </Row>
//       <Row label="Width">
//         {width}
//       </Row>
//     </section>
//   );
// }




// STEP 13: Other thing we would like to use life cycle methods are subsribtions so lets say we would like to monitor the window width
// export interface GreetingState {
//   name: string;
//   surname: string;
//   width: number;
// }
// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry",
//       surname: "Poppins",
//       width: window.innerWidth
//     }
//   }

//   componentDidMount() {
//     const {name, surname} = this.state;
//     document.title = `${name} ${surname}`;
//     window.addEventListener('resize', this.handleResize);
//   }

//   componentDidUpdate() {
//     const {name, surname} = this.state;
//     document.title = `${name} ${surname}`;
//   }

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.handleResize);
//   }

//   handleResize = () => {
//     this.setState({
//       width: window.innerWidth
//     })
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       surname: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {(locale: React.ReactElement) => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//             <Row label="Width">
//               {this.state.width}
//             </Row>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }




// STEP 12: How do we do this with hooks? Ability to perform sideeffect is other great feature of class components
// so if we want to use effect, we just useEffect
// compare, we have ability to access state variables easily because they are allready in context of function, we can set them easily
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
//   const [surname, setSurname] = React.useState("Poppins");
//   const theme: string = useContext(ThemeContext);
//   const locale: React.ReactElement = useContext(LocaleContext);

//   useEffect(() => {
//     document.title = `${name} ${surname}`;
//   })
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }

//   function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSurname(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         {locale}
//       </Row>
//     </section>
//   );
// }



// STEP 11: Now when I edit name, it does not get updated because I also need to implement componentDidUpdate
// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry",
//       surname: "Poppins"
//     }
//   }

//   componentDidMount() {
//     const {name, surname} = this.state;
//     document.title = `${name} ${surname}`
//   }

//   componentDidUpdate() {
//     const {name, surname} = this.state;
//     document.title = `${name} ${surname}`
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       surname: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {(locale: React.ReactElement) => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }





// STEP 10: Other thing that you might want to reach are live cycle methods for imerative DOM mutation or calling browser APIs
// you cannont do it during render because its not rendered yet, so the way to create side effects in react are live cycle methods
// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry",
//       surname: "Poppins"
//     }
//   }

//   componentDidMount() {
//     const {name, surname} = this.state;
//     document.title = `${name} ${surname}`
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       surname: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {(locale: React.ReactElement) => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }




// STEP 9: Now lets take a look how do we do it with hooks
// This not only reads the context, it also subscribes to the changes of the value
// Compare after
// How does react know that first call of useState coresponds to the name? It relies on the order of useState calls
// for hoos to work properly, you cannot call them in any condition, they have to be on top of the component
// this is an unusual restriction, but it allows some tricks that can be used later
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
//   const [surname, setSurname] = React.useState("Poppins");
//   const theme: string = useContext(ThemeContext);
//   const locale: React.ReactElement = useContext(LocaleContext);
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }

//   function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSurname(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         {locale}
//       </Row>
//     </section>
//   );
// }





// STEP 8: Back to class example: next thing we would like to do is to read context
// import theme and locale context, mention render prop API and implement consuming of theme and locale context
// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry",
//       surname: "Poppins"
//     }
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       surname: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Name">
//               <input
//                 value={this.state.name}
//                 onChange={this.handleNameChange}
//               />
//             </Row>
//             <Row label="Surname">
//               <input
//                 value={this.state.surname}
//                 onChange={this.handleSurnameChange}
//               />
//             </Row>
//             <LocaleContext.Consumer>
//               {(locale: React.ReactElement) => (
//                 <Row label="Language">
//                   {locale}
//                 </Row>
//               )}
//             </LocaleContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }





// STEP 7: How do we do this with hooks?
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
//   const [surname, setSurname] = React.useState("Poppins");
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }

//   function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSurname(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//       <Row label="Surname">
//         <input
//           value={surname}
//           onChange={handleSurnameChange}
//         />
//       </Row>
//     </section>
//   );
// }





// STEP 6: Add surname
export interface GreetingState {
  name: string;
  surname: string;
}

// export class Greeting extends React.Component<GreetingProps, GreetingState>
// {
//   constructor(props: GreetingProps) {
//     super(props);
//     this.state = {
//       name: "Marry",
//       surname: "Poppins"
//     }
//   }

//   handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       name: event.target.value
//     })
//   }

//   handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       surname: event.target.value
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
//         <Row label="Surname">
//           <input
//             value={this.state.surname}
//             onChange={this.handleSurnameChange}
//           />
//         </Row>
//       </section>
//     );
//   }
// }




// STEP 5: What if I could just useState
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = React.useState("Marry");
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
//       </Row>
//     </section>
//   );
// }





// STEP 4: They are related, put them toggether, where do i get them from?
// export function Greeting(props: GreetingProps) {
//   const [name, setName] = ???
  
//   function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setName(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Name">
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
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
//         <input
//           value={name}
//           onChange={handleNameChange}
//         />
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