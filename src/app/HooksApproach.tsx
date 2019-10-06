import React from 'react';
import { ThemeContext, SportContext} from './context';
import Row from './components/Row';

export interface PlayerCardProps {}

// STEP 16: Further extraction
// Comparison, hooks gives you ability to create custom abstractions that do not inflate react component tree and avoid the wrapper hell
export function PlayerCard(props: PlayerCardProps) {
  const player = useFormInput("Alexander Ovechkin");
  const team = useFormInput("Washington Capitals");
  const theme: string = React.useContext(ThemeContext);
  const sport: React.ReactElement = React.useContext(SportContext);
  const responzive = useWindowWidth();
  useDocumentTitle(`${player.value} ${team.value}`);
  
  return (
    <section className={theme}>
      <Row label="Player">
        <input {...player} />
      </Row>
      <Row label="Team">
        <input {...team} />
      </Row>
      <Row label="Sport">
        {sport}
      </Row>
      <Row label="Responzive">
        {responzive}
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
  const [responzive, setWidht] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidht(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return responzive;
}





// STEP 15: Hook calls are just function calls, components are just functions
// How do you extract it? You use another function
// This function is called custom hook, convention is: names start with "use" due to linting and indicating statefullness
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
//   const [team, setTeam] = React.useState("Washington Capitals");
//   const theme: string = React.useContext(ThemeContext);
//   const sport: React.ReactElement = React.useContext(SportContext);
//   const responzive = useWindowWidth();

//   React.useEffect(() => {
//     document.title = `${player} ${team}`;
//   })
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }

//   function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTeam(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//       <Row label="Team">
//         <input
//           value={team}
//           onChange={handleTeamChange}
//         />
//       </Row>
//       <Row label="Sport">
//         {sport}
//       </Row>
//       <Row label="Responzive">
//         {responzive}
//       </Row>
//     </section>
//   );
// }

// function useWindowWidth() {
//   const [responzive, setWidht] = React.useState(window.innerWidth);
//   React.useEffect(() => {
//     const handleResize = () => setWidht(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//   return responzive;
// }




// STEP 14: How do we do this with hooks?
// subscribing to the window responzive event is conceptially different thing, so we can separate it to another useEffect hook
// also cleaning up is conceptually part of this effect, so effect has a cleanup phase
// use effect will resubscribe on every rerender so there is an optional parameter dependency parameter to specify when to run it again
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
//   const [team, setTeam] = React.useState("Washington Capitals");
//   const theme: string = React.useContext(ThemeContext);
//   const sport: React.ReactElement = React.useContext(SportContext);

//   React.useEffect(() => {
//     document.title = `${player} ${team}`;
//   })

//   const [responzive, setWidht] = React.useState(window.innerWidth);
//   React.useEffect(() => {
//     const handleResize = () => setWidht(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [])
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }

//   function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTeam(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//       <Row label="Team">
//         <input
//           value={team}
//           onChange={handleTeamChange}
//         />
//       </Row>
//       <Row label="Sport">
//         {sport}
//       </Row>
//       <Row label="Responzive">
//         {responzive}
//       </Row>
//     </section>
//   );
// }






// STEP 12: How do we do this with hooks? Ability to perform sideeffect is other great feature of class components
// so if we want to use effect, we just useEffect
// compare, we have ability to access state variables easily because they are allready in context of function, we can set them easily
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
//   const [team, setTeam] = React.useState("Washington Capitals");
//   const theme: string = useContext(ThemeContext);
//   const sport: React.ReactElement = useContext(SportContext);

//   useEffect(() => {
//     document.title = `${player} ${team}`;
//   })
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }

//   function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTeam(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//       <Row label="Team">
//         <input
//           value={team}
//           onChange={handleTeamChange}
//         />
//       </Row>
//       <Row label="Sport">
//         {sport}
//       </Row>
//     </section>
//   );
// }



// STEP 9: Now lets take a look how do we do it with hooks
// This not only reads the context, it also subscribes to the changes of the value
// Compare after
// How does react know that first call of useState coresponds to the player? It relies on the order of useState calls
// for hoos to work properly, you cannot call them in any condition, they have to be on top of the component
// this is an unusual restriction, but it allows some tricks that can be used later
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
//   const [team, setTeam] = React.useState("Washington Capitals");
//   const theme: string = useContext(ThemeContext);
//   const sport: React.ReactElement = useContext(SportContext);
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }

//   function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTeam(event.target.value);
//   }
  
//   return (
//     <section className={theme}>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//       <Row label="Team">
//         <input
//           value={team}
//           onChange={handleTeamChange}
//         />
//       </Row>
//       <Row label="Sport">
//         {sport}
//       </Row>
//     </section>
//   );
// }








// STEP 7: How do we do this with hooks?
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
//   const [team, setTeam] = React.useState("Washington Capitals");
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }

//   function handleTeamChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setTeam(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//       <Row label="Team">
//         <input
//           value={team}
//           onChange={handleTeamChange}
//         />
//       </Row>
//     </section>
//   );
// }








// STEP 5: What if I could just useState
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = React.useState("Alexander Ovechkin");
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//     </section>
//   );
// }





// STEP 4: They are related, put them toggether, where do i get them from?
// export function PlayerCard(props: PlayerCardProps) {
//   const [player, setPlayer] = ???
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//     </section>
//   );
// }





// STEP 3: Not sure how to do it in functional component
// export function PlayerCard(props: PlayerCardProps) {
//   const player = ???
//   const setPlayer = ???
  
//   function handlePlayerChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setPlayer(event.target.value);
//   }
  
//   return (
//     <section>
//       <Row label="Player">
//         <input
//           value={player}
//           onChange={handlePlayerChange}
//         />
//       </Row>
//     </section>
//   );
// }










// STEP 1: Render a persons player
// export function PlayerCard(props: PlayerCardProps) {
//   return (
//     <section>
//       <Row label="Player">
//         {props.player}
//       </Row>
//     </section>
//   );
// }
