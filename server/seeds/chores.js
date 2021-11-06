module.exports = [
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Cooking",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        complete:false,
        photo:'/images/cooking.jpeg'
    },
    {
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Cleaning",
        dueAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        complete:true,
        completedAt: new Date(new Date().setDate(new Date().getDate()))
    },
];