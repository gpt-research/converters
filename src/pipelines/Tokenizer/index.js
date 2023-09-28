import tokenizerModule from './tokenizerUtil.js';

export const tokenizer = tokenizerModule;

export function TokenizerText(input){
    const text = input.text;
    const tokens = tokenizer(text).match('#Noun').out('array')
    return tokens;
};