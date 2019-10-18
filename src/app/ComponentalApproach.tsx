import React from 'react';
import { ThemeContext, SportContext} from './context';
import Row from './components/Row'

export interface PlayerCardProps {}

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