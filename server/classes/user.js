class User {
  //Constructor
  constructor() {
    this.people = [];
  }

  //Add a new person
  addPerson(id, name, room) {
    const person = { id, name, room };
    this.people.push(person);
    return person;
  }

  //Delete a person by id
  deletPerson(id) {
    const deletedPerson = this.getPerson(id);
    this.people = this.people.filter((person) => person.id !== id);
    return deletedPerson;
  }

  //Get a person by id
  getPerson(id) {
    const person = this.people.filter((person) => person.id === id)[0];
    return person;
  }

  //Get all people
  getPeople() {
    return this.people;
  }

  getPeopleByRoom(room) {
    const peopleByRoom = this.people.filter(person => person.room === room)
    return peopleByRoom
  }

}

module.exports = {
  User,
};
