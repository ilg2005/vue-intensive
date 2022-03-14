function add(a: number, b: number): number {
    return a + b
}

add(2, 3)

function toUpperCase(str: string): string {
    return str.trim().toUpperCase()
}

toUpperCase('feedback')

interface MyPosition {
    x: number | undefined
    y: number | undefined
}

interface MyPositionWithDefault extends MyPosition {
    default: string
}

function position(): MyPosition
function position(a: number): MyPositionWithDefault
function position(a: number, b: number): MyPosition

function position(a?: number, b?: number) {
    if (!a && !b) {
        return {x: undefined, y: undefined}
    }

    if (a && !b) {
        return {x: 10, y: undefined, default: a.toString()}
    }

    return {x: a, y: b}

}


console.log('Empty', position())
console.log('One Param', position(10))
console.log('Two Params', position(10, 15))
