import {Collection} from '../../packages/core/src/index'

describe ('xxxxx',()=>{
    it('it', ()=>{

        let c: Collection<string> = new Collection<string>({comparator: (compare: string, predicate: string)=> compare.includes('r') || predicate.includes('r') });
        c.add('teste');
        c.add('comparator');

        expect(c.contains('t')).toBe(true)
    })
})