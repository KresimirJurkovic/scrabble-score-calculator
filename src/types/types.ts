export type WordScore = {
  [key: string]: number;
}

export enum ValidationMessage {
  INVALID_CHARACTER = 'One or more invalid characters!',
  WORD_EMPTY = 'Word cannot have 0 characters!',
  WORD_ALREADY_SCORED = 'Word already scored!',
}