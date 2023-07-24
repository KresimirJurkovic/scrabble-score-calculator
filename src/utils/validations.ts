export default function validateInput(word: string): boolean {
  return /^[A-Za-z]*$/.test(word);
};