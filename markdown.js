import { isAbsolute, join } from "https://deno.land/std@0.148.0/path/mod.ts";

const details = {
    "source": "",
    "out": ""
}

async function initialize() {
    const sourceIndex = Deno.args.indexOf("--source");
    details.source = Deno.args[sourceIndex + 1];

    const outIndex = Deno.args.indexOf("--out");
    details.out = Deno.args[outIndex + 1];
}

async function loadSchema() {
    if (!isAbsolute(details.source)) {
        details.source = join(Deno.cwd(), details.source);
    }

    const json = JSON.parse(await Deno.readTextFile(details.source));
    console.log(json);
}

await initialize();
await loadSchema();

console.log(details);