import { TokenizerText, tokenizer } from '../Tokenizer/index.js';
import { loadModel } from '../../hub/index.js';

function TokenizeText(text){
    const tokens = TokenizerText({
        text
    })
    return tokens;
}

export async function TextGenerationPipeline(modelPath){
    const model = await loadModel(modelPath);
    return (input)=>{
        const tokens = TokenizeText(input);

        const base = model.sort(() => (Math.random() > 0.5) ? 1 : -1).find(({
        instruction
        }) => {
        return tokens.some(t => instruction.includes(t))
        })

        const safetokens = tokens.filter(t => {
            return !base.instruction.includes(t)
        })
        for (const baseTokens of tokenizer(base.output).json()) {
            for (const term of baseTokens.terms) {
            if (term.tags.includes('Noun') && Math.random() >= 0.3) {
                base.output = base.output.replaceAll(term.text, safetokens[Math.floor(Math.random() * safetokens.length)])
            }
            }
        }

        const resTokens = base.output
        return resTokens;
    }
}