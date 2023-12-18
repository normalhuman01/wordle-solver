import fs from 'fs'
import {getBestGuesses} from './getBestGuesses'
import {getPossibleWords} from './getPossibleWords'
import prompts from 'prompts'
import {list1} from './wordleGameList'

const dictionary = fs.readFileSync('./src/common5.txt', 'utf8').split('\n')
const common5small = fs.readFileSync('./src/common5small.txt', 'utf8').split('\n')
const commonOtherGame = list1

const guesses = {}

const run = async () => {
  const word = await prompts({
    type: 'text',
    name: 'value',
    message: '¿Qué palabra quieres usaste?'
  })

  const result = await prompts({
    type: 'text',
    name: 'value',
    message: '¿Qué resultado obtuvo? (e/i/w)'
  })

  guesses[word.value] = result.value

  const possibleWords = getPossibleWords({dictionary, guesses})
  const bestGuess = getBestGuesses(possibleWords)

  // new line
  console.log('')
  console.log('')

  if (possibleWords.length === 1) {
    console.log(`La palabra ganadora es ${possibleWords[0]}`)
    return
  }

  console.log(`Palabras restantes: ${possibleWords.length}`)
  console.log(`Mejores palabras:`)
  bestGuess.forEach(guess => {
    const isInCommon = common5small.includes(guess.word) ? '✅' : '❌'
    const isInOtherGame = commonOtherGame.includes(guess.word) ? '✅' : '❌'
    console.log(`${guess.word} (${isInCommon}${isInOtherGame}): ${guess.score}`)
  })

  console.log('')
  console.log('')
  run()
}

run()
