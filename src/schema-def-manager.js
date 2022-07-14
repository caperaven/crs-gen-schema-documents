export class SchemaDefManager {
    constructor(schemaDef) {
        this._schemaDef = schemaDef;
    }


    getTemplate(template) {
        let obj;

        if (typeof template == "object") {
            obj = template;
        }
        else {
            const property = template.replace("tpl:", "");
            obj = this._schemaDef.templates?.[property];
        }

        const keys = Object.keys(obj);
        for (let key of keys) {
            const prop = obj[key];
            if (typeof prop == "string" && prop.indexOf("tpl:") != -1) {
                obj[key] = this.getTemplate(prop);
            }
        }

        return obj;
    }

    getTypes() {
        return Object.keys(this._schemaDef.types);
    }

    getActions(type) {
        return Object.keys(type.actions);
    }

    getArgs(action) {
        let args;

        if (action["tpl:args"] != null) {
            const details = action["tpl:args"];
            args = this.getTemplate("tpl:args");
            args = Object.assign(args, details);
            return this.getTemplate(args);
        }

        return this.getTemplate(action["args"]);
    }
}