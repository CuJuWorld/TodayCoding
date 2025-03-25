const feedbacks = [
    { customerId: 1, feedbackDetails: [{ productId: 101, ratings: [5, 4] }, { productId: 102, ratings: [2] }] },
    { customerId: 2, feedbackDetails: [{ productId: 101, ratings: [3, 4, 5] }] },
    { customerId: 3, feedbackDetails: [{ productId: 102, ratings: [1, 3] }, { productId: 103, ratings: [5] }] }
];

const consolidateFeedback = (feedbacks) => {
    const aggregatedFeedback = {};
    feedbacks.forEach(feedback => {
        feedback.feedbackDetails.forEach(detail => {
            const { productId, ratings } = detail;
            if (!aggregatedFeedback[productId]) {
                aggregatedFeedback[productId] = { totalRatings: 0, count: 0};
            }
            ratings.forEach(rating => {
                aggregatedFeedback[productId].totalRatings += rating;
                aggregatedFeedback[productId].count += 1;
            });
        });
    });
    for (const productId in aggregatedFeedback) {
        const { totalRatings, count } = aggregatedFeedback[productId];
        aggregatedFeedback[productId].average = totalRatings / count;
    }
    return aggregatedFeedback;
};

console.log(consolidateFeedback(feedbacks));
// Output:
// {
//   '101': { totalRatings: 21, count: 5, average: 4.2 },
//   '102': { totalRatings: 6, count: 3, average: 2 },
//   '103': { totalRatings: 5, count: 1, average: 5 }
// }
