import {Collection} from '../../packages/core/src/index'

describe ('xxxxx',()=>{
    it('it', ()=>{    
        const person = new Entity(1, "John Doe")
        
        let personsCollection: Collection<Entity> = new Collection<Entity>({comparator: 'id'})
        personsCollection.add(person)
        
        let personsArray: Array<Entity> = new Array<Entity>();
        personsArray.push(person)
        
        console.log(personsCollection.contains(new Entity(1, "John Doe")));
        console.log(personsArray.includes(new Entity(1, "John Doe")));
        
        expect(!!personsArray.findIndex( p=> p.id == (new Entity(1, "John Doe")).id)).toBe(false)
        expect(personsCollection.contains(new Entity(1, "John Doe"))).toBe(true)
    })
})

class Entity {
    constructor( public readonly id: number, public readonly name: string){}
 }

 class ValueObject {
    constructor(
       public readonly rua: string,
       public readonly numero: string
    ){}
}