const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school, role) {
        super(name, id, email, role)
        this.school = school
    }

    getSchool() {
        return this.school
    }
    getRole() {
        return "Intern"
    }
};

module.exports = Intern;