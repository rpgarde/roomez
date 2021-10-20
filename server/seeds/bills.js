module.exports = [
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Electricity",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        // houseId: 1,
        // createdBy: 1,
        // assignedTo: 2,
        amount: 100,
        paid:false,
        photo:'bill1.jpg'
    },
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Water",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        // houseId: 1,
        // createdBy: 2,
        // assignedTo: 1,
        amount: 80,
        paid:true,
        paidAt:new Date(new Date().setDate(new Date().getDate())),
        photo:'bill2.jpg'
    },
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
        name: "Gas",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 4)),
        // houseId: 1,
        // createdBy: 2,
        // assignedTo: 1,
        amount: 80,
        paid:false,
        photo:'bill2.jpg'
    },
];