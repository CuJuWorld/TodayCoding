const categories = [
    {
        name: "Electronics",
        subcategories: [
            { name: "Mobile Phones" },
            { name: "Laptops" }
        ]
    },
    {
        name: "Home Appliances",
        subcategories: [
            { name: "Refrigerators" },
            { name: "Washing Machines" }
        ]
    }
];

const flattenCategories = (categories) => {
    const flatList = [];
    categories.forEach(category => {
        flatList.push(category.name);
        category.subcategories.forEach(subcategory => {
            flatList.push(subcategory.name);
        });
    });
    return flatList;
};

console.log(flattenCategories(categories));
// Output:
// [
//     'Electronics',
//     'Mobile Phones',
//     'Laptops',
//     'Home Appliances',
//     'Refrigerators',
//     'Washing Machines'
//   ]
