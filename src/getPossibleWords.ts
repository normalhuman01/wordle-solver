import {guessComparison} from './guessComparison'

export interface Options {
  dictionary: string[]
  guesses: {
    [guess: string]: string
  }
}

export const getPossibleWords = (options: Options): string[] => {
  return options.dictionary.filter(word => {
    for (const guess in options.guesses) {
      const resultForGuess = options.guesses[guess]
      const resultAsumingWord = guessComparison(guess, word)
      if (resultForGuess !== resultAsumingWord) {
        return false
      }
    }

    return true
  })
}
