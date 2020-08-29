class User {
  //Constructor
  constructor() {
    this.people = [];
  }

  //Add a new person
  addPerson(id, name) {
    const person = { id, name };
    this.people.push(person);
    return this.people;
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

}

module.exports = {
  User,
};
