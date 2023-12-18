import normalizeText from './normalizeText'

export type Result = Array<'e' | 'i' | 'w'>

const resultTypes = {
  CorrectPosition: 'e',
  InWord: 'i',
  NotInWord: 'w'
}

export function guessComparison(guess: string, correctWord: string): string {
  guess = normalizeText(guess)
  correctWord = normalizeText(correctWord)

  if (guess.length !== correctWord.length) {
    throw 'guess and correctWord must be of equal length'
  }

  const wordleLength = guess.length

  let letters = new Array(wordleLength)
  let remainingLetters = correctWord.split('')

  // First we determine correctly positioned letters
  for (let i = 0; i < letters.length; i++) {
    const guessedLetter = guess.charAt(i)
    let result = null

    if (correctWord.charAt(i) === guessedLetter) {
      result = resultTypes.CorrectPosition
      remainingLetters[i] = null
    }

    letters[i] = {
      value: guessedLetter,
      result
    }
  }

  // And then we consider letters that exist in the word, handling duplicates.
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].result !== null) {
      continue
    }

    const guessedLetter = guess.charAt(i)
    const index = remainingLetters.indexOf(guessedLetter)
    if (index !== -1) {
      letters[i].result = resultTypes.InWord
      remainingLetters[index] = null
    } else {
      letters[i].result = resultTypes.NotInWord
    }
  }

  return letters.map(r => r.result).join('')
}
