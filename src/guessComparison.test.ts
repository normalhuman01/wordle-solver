import {guessComparison} from './guessComparison'

describe('guessComparison', () => {
  it('Case exact match', () => {
    const result = guessComparison('nacer', 'nacer')
    expect(result).toEqual('eeeee')
  })

  it('Case all wrong', () => {
    const result = guessComparison('aaaaa', 'bbbbb')
    expect(result).toEqual('wwwww')
  })

  it('Case when passed a repeated word and is not twice in word', () => {
    const result = guessComparison('aa', 'ab')
    expect(result).toEqual('ew')
  })

  it('Case cenes / rueda', () => {
    const result = guessComparison('cenes', 'rueda')
    expect(result).toEqual('wiwww')
  })

  it('Case nacer / rueda', () => {
    const result = guessComparison('nacer', 'rueda')
    expect(result).toEqual('wiwii')
  })

  it('Case comer / rueda', () => {
    const result = guessComparison('comer', 'rueda')
    expect(result).toEqual('wwwii')
  })
})
