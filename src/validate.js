import {SchemaDefManager} from "./schema-def-manager.js";

export function validate(def, schema) {
    const inflatedDef = inflate_def(def);
    console.log(JSON.stringify(inflatedDef, null, 4));
}

function inflate_def(def) {
    const clone = JSON.parse(JSON.stringify(def));
    const manager = new SchemaDefManager(clone);
    const types = manager.getTypes();

    for (const name of types) {
        const type = manager.getType(name);
        inflate_type(type, manager);
        clone.types[name] = type;
    }

    delete clone.templates;
    return clone;
}

function inflate_type(type, manager) {
    const actions = manager.getActions(type);

    for (const name of actions) {
        const action = manager.getAction(type, name);
        inflate_action(action, manager);
        type.actions[name] = action;
    }
}

function inflate_action(action, manager) {
    const args = manager.getArgs(action);
    action.args = args;
    delete action["tpl:args"];
}