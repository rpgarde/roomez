module.exports = [
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Electricity",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        houseId: 1,
        createdBy: 1,
        assignedTo: 2,
        amount: 100,
        paid:false,
        // paidAt:NULL
    },
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Water",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        houseId: 1,
        createdBy: 2,
        assignedTo: 1,
        amount: 80,
        paid:true,
        paidAt:new Date(new Date().setDate(new Date().getDate()))
    },
];