import { KeyboardEvent, useRef, useState } from 'react';
import TileRow from './components/TileRow/TileRow';
import validateInput from './utils/validations';
import * as scrabbleApi from './api/scrabbleApi';
import * as rules from './constants/rules';
import { ValidationMessage, WordScore } from './types/types';

import styles from './app.module.css';

export default function App() {
  const [words, setWords] = useState<WordScore>({});
  const [validationMessage, setValidationMessage] = useState<
    ValidationMessage | undefined
  >(undefined);
  const [fetching, setFetching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const clearValidationMessage = () => {
    setValidationMessage(undefined);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    clearValidationMessage();
    if (event.key === 'Enter' && inputRef.current) {
      fetchScore(inputRef.current.value);
      clearInput();
    }
    const keyPressed = event.key;
    const currentValue = inputRef.current?.value + keyPressed;

    if (!validateInput(currentValue)) {
      setValidationMessage(ValidationMessage.INVALID_CHARACTER);
      event.preventDefault();
    }
  };

  const renderRowScores = () => {
    const rowScores = [];
    const wordsArray = Object.entries(words);

    for (let i = wordsArray.length - 1; i >= 0; i--) {
      const [word, score] = wordsArray[i];
      const rowScore = (
        <div key={word} className={styles.rowContainer}>
          <TileRow word={word} score={score} />
        </div>
      );
      rowScores.push(rowScore);
    }

    return rowScores;
  };

  const fetchScore = async (word: string | undefined) => {
    if (!word || !validateInput(word)) {
      const validationMessage = word
        ? ValidationMessage.INVALID_CHARACTER
        : ValidationMessage.WORD_EMPTY;
      setValidationMessage(validationMessage);
      return;
    }

    if (words[word] != null) {
      clearInput();
      setValidationMessage(ValidationMessage.WORD_ALREADY_SCORED);
      return;
    }

    try {
      setFetching(true);
      const response = await scrabbleApi.getWordScore(word);
      const data = await response.json();
      const score = data.error ? 0 : data.value;

      setWords((prevWords: WordScore) => {
        return { ...prevWords, [word]: score };
      });

      setFetching(false);
    } catch (err) {
      setFetching(false);
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Scrabble score calculator</h1>
      <input
        autoFocus
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyPress}
        maxLength={rules.MAX_LETTERS}
      />
      <button
        disabled={fetching}
        className={styles.button}
        onClick={() => fetchScore(inputRef.current?.value)}
      >
        Calculate score
      </button>
      {validationMessage ? (
        <div style={{ color: 'blue' }}>{validationMessage}</div>
      ) : null}
      <div className={styles.rowsContainer}>{renderRowScores()}</div>
    </div>
  );
}
