import fs from 'node:fs'

export class ShinyColorsMatcher {
    rank1: RegExp
    rank2: RegExp

    constructor() {
        const text = fs.readFileSync('keyword.json', 'utf8')
        const obj = JSON.parse(text)
        if ('rank1' in obj) {
            const keywords: string[] = obj.rank1
            this.rank1 = new RegExp(keywords.join('|'))
        }
        if ('rank2' in obj) {
            const keywords: string[] = obj.rank2
            this.rank2 = new RegExp(keywords.join('|'))
        }
    }

    public test(text: string): boolean {
        if (this.rank1.test(text)) {
            return true
        }

        const result = this.rank2.exec(text)
        return result !== null && result.length >= 2
    }
}
