import { isAbsolute, join } from "https://deno.land/std@0.148.0/path/mod.ts";
import {SchemaDefManager} from "./src/schema-def-manager.js";
import {MarkdownFactory} from "./src/markdown-factory.js";

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

    details.out = join(Deno.cwd(), details.out);

    const json = JSON.parse(await Deno.readTextFile(details.source));
    const manager = new SchemaDefManager(json);
    return manager;
}

await initialize();
const manager = await loadSchema();
const markdown = new MarkdownFactory(manager, details.out);

markdown.generate();
console.log(details);