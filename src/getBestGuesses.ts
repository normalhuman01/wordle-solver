import {keys, round, sortBy} from 'lodash'
import {getPossibleWords} from './getPossibleWords'
import {guessComparison} from './guessComparison'
import cliProgress from 'cli-progress'
import {list1} from './wordleGameList'

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

const average = arr => round(arr.reduce((a, b) => a + b, 0) / arr.length, 2)

// get the best word for wordle
export const getBestGuesses = (dictionary: string[]) => {
  const results = {}

  let i = 0
  bar1.start(dictionary.length, 0)

  for (const word of dictionary) {
    const resultsForWord = []

    for (const word2 of dictionary) {
      const guesses = {
        [word]: guessComparison(word, word2)
      }

      const result = getPossibleWords({dictionary, guesses})
      resultsForWord.push(result.length)
    }

    results[word] = average(resultsForWord)

    bar1.update(i++)
  }

  const array = keys(results).map(key => {
    return {
      word: key,
      score: results[key]
    }
  })

  const sorted = sortBy(array, 'score')

  bar1.stop()

  // first elements of the array
  return sorted.slice(0, 30)
}
