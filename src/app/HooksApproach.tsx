import React from 'react';
import { ThemeContext, SportContext} from './context';
import Row from './components/Row';

export interface PlayerCardProps {}

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