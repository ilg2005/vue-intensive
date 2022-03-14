interface Rect {
    readonly id: string,
    color?: string,
    size: {
        width: number,
        height: number
    }
}

const rect1: Rect = {
    id: '123',
    size: {
        width: 100,
        height: 100
    }
}

rect1.color = '#ccc'

const rect2 = {} as Rect
const rect3 = <Rect>{}

//================

interface RectWithArea extends Rect {
    getArea: () => number
}

const rect5: RectWithArea = {
    id: '123',
    size: {
        width: 10,
        height: 10
    },
    getArea(): number {
        return this.size.width * this.size.height
    }
}

//=====================
interface IClock {
    time: Date
    setTime(date: Date): void
}

class Clock implements IClock {
    time: Date = new Date()
    setTime(date: Date) {
        this.time = date
    }
}

//==============
interface Styles {
    [key: string]: string
}

const css: Styles = {
    border: '1px solid red',
    marginTop: '2px',
    borderRadius: '5px'
}
