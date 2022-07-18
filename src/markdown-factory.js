import { join } from "https://deno.land/std@0.148.0/path/mod.ts";

export class MarkdownFactory {
    constructor(schemaManager, folder) {
        this._schemaManager = schemaManager;
        this._folder = folder;
    }

    generate() {
        const types = this._schemaManager.getTypes();

        for (const type of types) {
            const lines = [];
            const typeObj = this._schemaManager.getType(type);

            lines.push(`# ${type}`);
            lines.push(typeObj.description);
            lines.push("\n");

            this.generateFromType(typeObj, type, lines);
        }
    }

    generateFromType(type, typeName, lines) {
        const actions = this._schemaManager.getActions(type);
        lines.push("## Actions");

        for (let i = 0; i < actions.length; i++) {
            const name = actions[i];
            const action = this._schemaManager.getAction(type, name);
            lines.push(`\n\n**${i}. ${name}** - ${action.description}`);

            const args = this._schemaManager.getArgs(action);

            if (args != null) {
                const argsKeys = Object.keys(args);
                for (const key of argsKeys) {
                    const argsObj = args[key];
                    lines.push(`\n- ${key} - ${argsObj.description || ""}  `);
                    lines.push(`\n\t- required: ${argsObj.required ?? false}  `);

                    if (argsObj["alt"] != null) {
                        lines.push(`\n\t- require alternative: ${argsObj["alt"]}  `);
                    }

                    if (argsObj["type"] != null) {
                        lines.push(`\n\t- type: ${argsObj["type"]}  `);
                    }

                    if (argsObj["default"] != null) {
                        lines.push(`\n\t- default: ${argsObj["default"]}  `);
                    }
                }
            }
        }

        this.saveToFile(typeName, lines).catch(error => console.error(error));
    }

    async saveToFile(type, content) {
        const file = join(this._folder, `${type}.md`);
        await Deno.writeTextFile(file, content.join(""));
    }
}