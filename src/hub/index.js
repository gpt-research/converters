export async function loadModel(path){
    const model = await fetch(`https://raw.githubusercontent.com/gpt-research/hub/main/models/${path}.model`);
    const text = await model.text();
    const modelCompiled = JSON.parse(JSON.parse("[" + text + "]").reduce((p, c) =>
    p + String.fromCharCode(c), ''));
    return modelCompiled;
}