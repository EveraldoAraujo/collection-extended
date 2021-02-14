# extended-collection
##A simple, generic and extended collection.

## Iniciando

Considerando o seguinte tipo:
```typescript
class Entity {
   constructor( 
      public readonly id: number,
      public readonly name: string
   ){}
 }
```

E o seguinte cenário:
```typescript
const person = new Entity(1, "John Doe");
addToChat(person);
```

### Onde as entidades(person) são identificadas por id.
#### Com native Array
```typescript
async addToChat(person: Entity){
   //const persons: Array<Entity> = await _repository.getAll();
   const persons: Array<Entity> = [new Entity(1, "John Doe")]; // for sample

   console.log(persons.includes(person));
   // expected: true
   // received: false, because is by object reference
}
```

#### Como resolver com native Array
```typescript
async addToChat(person: Entity){
   //const persons: Array<Entity> = await _repository.getAll();
   const persons: Array<Entity> = [new Entity(1, "John Doe")]; // for sample

   console.log(!!persons.findIndex( p=> p.id == person.id));
   // expected: true
   // received: true
   // BUT much verbose
}
```

#### Como resolver com Collection:
```typescript
async addToChat(person: Entity){
   //const persons: Collection<Entity> = new Collection<Entity>({
   //   comparator: 'id', startWith:  await _repository.getAll() 
   //   });
   
   const persons: Collection<Entity> = new Collection<Entity>({
         comparator: 'id',
         startWith: [new Entity(1, "John Doe")]
      }); // for sample

   console.log(persons.contains(person));
   // expected: true
   // received: true
   // SUCCESS
}
```

## Um exemplo mais complexo

Considerando o seguinte tipo:
```typescript
class Entity {
   constructor( 
      public readonly id: number,
      public readonly name: string,
      public readonly addresses: Array<Address>
   ){}
}

class Address {
    constructor(
       public readonly zipcode: string,
       public readonly city: string,
       public readonly district: string,
       public readonly street: string,
       public readonly number: string,
       public readonly discriminator: string
    ){}
}
```

E o seguinte cenário:
```typescript
//user = await repository.getById(1);

const address = new Address(
   "12344-567",
   "My City",
   "Central",
   "Street 99", 
   1000,
   "D"
   );

userHaveAdress(user, address);
```

### Onde os objetos são comparados por todas as propriedades
Com native Array
```typescript
async userHaveAdress(user: Entity, address: Address){

   console.log(user.adresses.includes(adress));
   // expected: true
   // received: false, but is by object reference
}
```

#### Como resolver com native Array
```typescript
async userHaveAdress(user: Entity, address: Address){

   console.log(!!user.adresses.findIndex( a=> 
      a.zipcode  === adress.zipcode &&
      a.city  === adress.city &&
      a.district  === adress.district &&
      a.street  === adress.street &&
      a.number  === adress.number &&
      a.discriminator === adress.discriminator
   ));
   // expected: true
   // received: true
   // BUT much verbose
}
```

#### Como resolver com Collection:

change type on user and initialize collection with comparator prop:
```typescript
   ...
   public readonly addresses: Collection<Address>
   ...

   this.address = new Collection<Address>({
      comparator: ['zipcode', 'city', 'district', 'street', 'number', 'discriminator']
   });

```

```typescript
async userHaveAdress(user: Entity, address: Address){
   console.log(user.addresses.contains(address));
   // expected: true
   // received: true
   // SUCCESS
}
```