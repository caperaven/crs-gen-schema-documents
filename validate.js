import { isAbsolute, join } from "https://deno.land/std@0.148.0/path/mod.ts";
import {validate} from "./src/validate.js";

const details = {
    def: "",
    schema: ""
}

async function initialize() {
    const defIndex = Deno.args.indexOf("--def");
    details.def = Deno.args[defIndex + 1];

    const schemaIndex = Deno.args.indexOf("--schema");
    details.schema = Deno.args[schemaIndex + 1];
}

async function loadSchemas() {
    if (!isAbsolute(details.def)) {
        details.def = join(Deno.cwd(), details.def);
        details.def = JSON.parse(await Deno.readTextFile(details.def));
    }

    if (!isAbsolute(details.schema)) {
        details.schema = join(Deno.cwd(), details.schema);
        details.schema = JSON.parse(await Deno.readTextFile(details.schema));
    }
}

await initialize();
await loadSchemas();

const result = validate(details.def, details.schema);
