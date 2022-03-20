function add(a, b) {
    return a + b;
}
add(2, 3);
function toUpperCase(str) {
    return str.trim().toUpperCase();
}
toUpperCase('feedback');
function position(a, b) {
    if (!a && !b) {
        return { x: undefined, y: undefined };
    }
    if (a && !b) {
        return { x: 10, y: undefined, "default": a.toString() };
    }
    return { x: a, y: b };
}
console.log('Empty', position());
console.log('One Param', position(10));
console.log('Two Params', position(10, 15));
