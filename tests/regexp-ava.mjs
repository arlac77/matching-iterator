import test from "ava";


test("glob regex", t => {
    const r = new RegExp("((?:[^/]*(?:/|$))*)");

    t.truthy("a".match(r));
    t.truthy("a/b".match(r));
});