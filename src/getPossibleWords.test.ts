import {getPossibleWords} from './getPossibleWords'

describe('getPossibleWords', () => {
  it('Should return possible words', () => {
    const dictionary = ['rueda', 'cenes', 'nacer', 'comer']
    const guesses = {
      nacer: 'wiwii',
      comer: 'wwwii',
      cenes: 'wiwww'
    }

    const result = getPossibleWords({dictionary, guesses})
    expect(result).toEqual(['rueda'])
  })
})
