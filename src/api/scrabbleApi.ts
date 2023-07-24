const apiKey = import.meta.env.VITE_WORDNIK_API_KEY;

const getWordScore = (word: string) => {
  return fetch(
    `https://api.wordnik.com/v4/word.json/${word}/scrabbleScore?api_key=${apiKey}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )
};

export {getWordScore};