import scoreMap from '../../data/scores.json';
import styles from './tile.module.css';

type TileProps = {
  character: string;
  notFound: boolean;
};

const letterScores: { [key: string]: number } = scoreMap;
export default function Tile({ character, notFound }: TileProps) {
  const notFoundStyles = notFound ? styles.notFound : null;
  return (
    <div className={`${styles.tile} ${notFoundStyles}`}>
      <div>{character}</div>
      <div className={`${styles.score} ${notFoundStyles}`}>{letterScores[character]}</div>
    </div>
  );
}
