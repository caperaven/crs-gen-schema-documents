import {assert, assertEquals} from "https://deno.land/std@0.148.0/testing/asserts.ts";
import {SchemaDefManager} from "./../src/schema-def-manager.js";

Deno.test("get template", () => {
    const schema = {
        "templates": {
            "args": {
                "id": "tpl:id",
                "query": "tpl:query"
            },
            "id": {
                "description": "id of element to check",
                "required": false,
                "alt": ["query"]
            },
            "query": {
                "description": "css selector for element to check",
                "required": false,
                "alt": ["id"]
            },
        }
    }

    const manager = new SchemaDefManager(schema);
    const obj = manager.getTemplate("tpl:args");
    assert(obj.id != null);
    assert(obj.query != null);
});

Deno.test("get types", () => {
    const schema = {
        "types": {
            "assert": {},
            "perform": {},
            "system": {},
            "wait": {}
        }
    };

    const manager = new SchemaDefManager(schema);
    const obj = manager.getTypes();
    assertEquals(obj, ["assert", "perform", "system", "wait"]);
})

Deno.test("get actions", () => {
    const type = {
        "description": "some type",
        "actions": {
            "action1": {},
            "action2": {}
        }
    }

    const manager = new SchemaDefManager();
    const actions = manager.getActions(type);
    assertEquals(actions, ["action1", "action2"]);
})

Deno.test("get args", () => {
    const schema = {
        "templates": {
            "args": {
                "id": "tpl:id",
                "query": "tpl:query"
            },
            "id": {
                "description": "id of element to check",
                "required": false,
                "alt": ["query"]
            },
            "query": {
                "description": "css selector for element to check",
                "required": false,
                "alt": ["id"]
            },
        }
    }

    const action = {
        "description": "some action",
        "tpl:args": {}
    }

    const manager = new SchemaDefManager(schema);
    const args = manager.getArgs(action);

    assert(args.id != null);
    assert(args.query != null);

    const action2 = {
        "description": "some action",
        "tpl:args": {
            "myprop": {
                "description": "my property",
                "required": true
            }
        }
    }

    const args2 = manager.getArgs(action2);

    assert(args2.id != null);
    assert(args2.query != null);
    assert(args2.myprop != null);

    const args3 = manager.getArgs({
        "args": {
            "id": "tpl:id"
        }
    })

    assert(args3.id != null);
    assert(args3.query == null);
})