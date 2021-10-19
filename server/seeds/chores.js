module.exports = [
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Cooking",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        houseId: 1,
        createdBy: 1,
        assignedTo: 2,
        complete:false,
        // completedAt: NULL
    },
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Cleaning",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        houseId: 1,
        createdBy: 2,
        assignedTo: 1,
        complete:true,
        completedAt: new Date(new Date().setDate(new Date().getDate()))
    },
];