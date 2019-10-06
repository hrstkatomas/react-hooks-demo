import React from 'react';
import { ThemeContext, SportContext} from './context';
import Row from './components/Row'

export interface PlayerCardProps {}

// STEP 13: Other thing we would like to use life cycle methods are subsribtions so lets say we would like to monitor the window responzive
export interface PlayerCardState {
  player: string;
  team: string;
  responzive: number;
}

export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
{
  constructor(props: PlayerCardProps) {
    super(props);
    this.state = {
      player: "Cristiano Ronaldo",
      team: "Juventus",
      responzive: window.innerWidth
    }
  }

  componentDidMount() {
    const {player, team} = this.state;
    document.title = `${player} ${team}`;
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const {player, team} = this.state;
    document.title = `${player} ${team}`;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      responzive: window.innerWidth
    })
  }

  handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      player: event.target.value
    })
  }

  handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      team: event.target.value
    })
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(theme: string) => (
          <section className={theme}>
            <Row label="Player">
              <input
                value={this.state.player}
                onChange={this.handlePlayerChange}
              />
            </Row>
            <Row label="Team">
              <input
                value={this.state.team}
                onChange={this.handleTeamChange}
              />
            </Row>
            <SportContext.Consumer>
              {(sport: React.ReactElement) => (
                <Row label="Sport">
                  {sport}
                </Row>
              )}
            </SportContext.Consumer>
            <Row label="Responzive">
              {this.state.responzive}
            </Row>
          </section>
        )}
      </ThemeContext.Consumer>
    );
  }
}


// STEP 11: Now when I edit player, it does not get updated because I also need to implement componentDidUpdate
// export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
// {
//   constructor(props: PlayerCardProps) {
//     super(props);
//     this.state = {
//       player: "Cristiano Ronaldo",
//       team: "Juventus"
//     }
//   }

//   componentDidMount() {
//     const {player, team} = this.state;
//     document.title = `${player} ${team}`
//   }

//   componentDidUpdate() {
//     const {player, team} = this.state;
//     document.title = `${player} ${team}`
//   }

//   handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       player: event.target.value
//     })
//   }

//   handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       team: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Player">
//               <input
//                 value={this.state.player}
//                 onChange={this.handlePlayerChange}
//               />
//             </Row>
//             <Row label="Team">
//               <input
//                 value={this.state.team}
//                 onChange={this.handleTeamChange}
//               />
//             </Row>
//             <SportContext.Consumer>
//               {(sport: React.ReactElement) => (
//                 <Row label="Sport">
//                   {sport}
//                 </Row>
//               )}
//             </SportContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }





// STEP 10: Other thing that you might want to reach are live cycle methods for imerative DOM mutation or calling browser APIs
// you cannont do it during render because its not rendered yet, so the way to create side effects in react are live cycle methods
// export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
// {
//   constructor(props: PlayerCardProps) {
//     super(props);
//     this.state = {
//       player: "Cristiano Ronaldo",
//       team: "Juventus"
//     }
//   }

//   componentDidMount() {
//     const {player, team} = this.state;
//     document.title = `${player} ${team}`
//   }

//   handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       player: event.target.value
//     })
//   }

//   handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       team: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Player">
//               <input
//                 value={this.state.player}
//                 onChange={this.handlePlayerChange}
//               />
//             </Row>
//             <Row label="Team">
//               <input
//                 value={this.state.team}
//                 onChange={this.handleTeamChange}
//               />
//             </Row>
//             <SportContext.Consumer>
//               {(sport: React.ReactElement) => (
//                 <Row label="Sport">
//                   {sport}
//                 </Row>
//               )}
//             </SportContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }




// STEP 8: Back to class example: next thing we would like to do is to read context
// import theme and sport context, mention render prop API and implement consuming of theme and sport context
// export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
// {
//   constructor(props: PlayerCardProps) {
//     super(props);
//     this.state = {
//       player: "Cristiano Ronaldo",
//       team: "Juventus"
//     }
//   }

//   handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       player: event.target.value
//     })
//   }

//   handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       team: event.target.value
//     })
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {(theme: string) => (
//           <section className={theme}>
//             <Row label="Player">
//               <input
//                 value={this.state.player}
//                 onChange={this.handlePlayerChange}
//               />
//             </Row>
//             <Row label="Team">
//               <input
//                 value={this.state.team}
//                 onChange={this.handleTeamChange}
//               />
//             </Row>
//             <SportContext.Consumer>
//               {(sport: React.ReactElement) => (
//                 <Row label="Sport">
//                   {sport}
//                 </Row>
//               )}
//             </SportContext.Consumer>
//           </section>
//         )}
//       </ThemeContext.Consumer>
//     );
//   }
// }







// STEP 6: Add team
// export interface PlayerCardState {
//   player: string;
//   team: string;
// }

// export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
// {
//   constructor(props: PlayerCardProps) {
//     super(props);
//     this.state = {
//       player: "Cristiano Ronaldo",
//       team: "Juventus"
//     }
//   }

//   handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       player: event.target.value
//     })
//   }

//   handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       team: event.target.value
//     })
//   }

//   render() {
//     return (
//       <section>
//         <Row label="Player">
//           <input
//             value={this.state.player}
//             onChange={this.handlePlayerChange}
//           />
//         </Row>
//         <Row label="Team">
//           <input
//             value={this.state.team}
//             onChange={this.handleTeamChange}
//           />
//         </Row>
//       </section>
//     );
//   }
// }





// STEP 2: Make persons player editable
// export interface PlayerCardState {
//   player: string;
// }

// export class PlayerCard extends React.Component<PlayerCardProps, PlayerCardState>
// {
//   constructor(props: PlayerCardProps) {
//     super(props);
//     this.state = {
//       player: "Cristiano Ronaldo"
//     }
//   }

//   handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       player: event.target.value
//     })
//   }

//   render() {
//     return (
//       <section>
//         <Row label="Player">
//           <input
//             value={this.state.player}
//             onChange={this.handlePlayerChange}
//           />
//         </Row>
//       </section>
//     );
//   }
// }





// STEP 1: Render a persons player
// export function PlayerCard(props: PlayerCardProps) {
//   return (
//     <section>
//       <Row label="Player">
//         Cristiano Ronaldo
//       </Row>
//     </section>
//   );
// }
