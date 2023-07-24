import Tile from '../Tile/Tile';
import styles from './tileRow.module.css';

type TilesProps = {
  word: string;
  score: number;
};

export default function TileRow({ word, score }: TilesProps) {
  const notFound = score === 0;
  const notFoundStyles = notFound ? styles.notFound : null;
  return (
    <div className={styles.tileRow}>
      <div className={`${styles.score} ${notFoundStyles}`}>{score}</div>
      {Array.from(word).map((el: string, i: number) => (
        <Tile key={i} character={el} notFound={notFound} />
      ))}
    </div>
  );
}
