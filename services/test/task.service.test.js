const taskService = require('../task.service');
const taskModel = require('../task.service');

describe("Test task services", () => {
    describe("Test #getAllTaskAsAdmin() method", () => {
        it("Should return list tasks", async () => {
            let returnValue = [{
                    personID: "1234",
                    name: "Task 1",
                    discript: "Discript 1"
                },
                {
                    personID: "1234",
                    name: "Task 2",
                    discript: "Description 2"
                }
            ];
            taskModel.listAll = jest.fn().mockReturnValue(returnValue);
            expect(taskService.getAllTaskAsAdmin()).resolves.toEqual(returnValue);
        });
    });

    describe("Test #getAllTaskAsUser() method", () => {
        it("Should return list tasks", async () => {
            let personID = "1234";
            let returnValue = [{
                    personID: "1234",
                    name: "Task 1",
                    discript: "Discript 1"
                },
                {
                    personID: "1234",
                    name: "Task 2",
                    discript: "Description 2"
                }
            ];
            taskModel.listByPersonID = jest.fn().mockReturnValue(returnValue);
            expect(taskService.getAllTaskAsUser(personID)).resolves.toEqual(returnValue);
        });
    });

    describe("Test #getOneTaskAsAdmin() method", () => {
        it("Should return list tasks", async () => {
            let id = "321wd3adsa124daas";
            let returnValue = [{
                    _id: "321wd3adsa124daas",
                    personID: "1234",
                    name: "Task 1",
                    discript: "Discript 1"
                }
            ];
            taskModel.findById = jest.fn().mockReturnValue(returnValue);
            expect(taskService.getOneTaskAsAdmin(id)).resolves.toEqual(returnValue);
        });
    });

    describe("Test #getOneTaskAsUser() method", () => {
        it("Should return list tasks", async () => {
            let id = "321wd3adsa124daas";
            let returnValue = [{
                _id: "321wd3adsa124daas",
                personID: "1234",
                name: "Task 1",
                discript: "Discript 1"
            }];
            taskModel.findByIdAsUser = jest.fn().mockReturnValue(returnValue);
            expect(taskService.getOneTaskAsUser(id)).resolves.toEqual(returnValue);
        });
    });

    describe("Test #deleteOneTaskAsAdmin() method", () => {
        it("Should return empty value", async () => {
            let returnValue = [{}];
            taskModel.deleteOne = jest.fn().mockReturnValue(returnValue);
            expect(taskService.createTask()).resolves.toEqual(returnValue);
        });
    });

    describe("Test #createTask() method", () => {
        it("Should return list tasks", async () => {
            let data = {
                personID: "1234",
                name: "Task 4",
                discript: "Discript 1"
            };
            let returnValue = [{
                _id: "321wd3adsa124daas",
                personID: "1234",
                name: "Task 4",
                discript: "Discript 1"
            }];
            taskModel.create = jest.fn().mockReturnValue(returnValue);
            expect(taskService.createTask(data)).resolves.toEqual(returnValue);
        });
    });
});