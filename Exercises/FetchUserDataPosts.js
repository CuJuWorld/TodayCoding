function fetchUserData(userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        return Promise.reject(new Error("Invalid userId. It must be a positive integer."));
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "Steve Jobs" },
                2: { id: 2, name: "Brad Pitt" },
                3: { id: 3, name: "George Clooney" },
                4: { id: 4, name: "Jennifer Lawrence" },
                5: { id: 5, name: "Scarlett Johansson" },
                6: { id: 6, name: "Tom Cruise" }
            };
            console.log(`Fetched user data for user ID: ${userId}`);
            resolve(users[userId]);
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        return Promise.reject(new Error("Invalid userId. It must be a positive integer."));
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = [
                { postId: 1, content: "Heaven!" },
                { postId: 2, content: "Cycling" },
                { postId: 3, content: "Diving" },
                { postId: 4, content: "Fishing" },
                { postId: 5, content: "Hiking" },
                { postId: 6, content: "Ice-Skating" },
                { postId: 7, content: "Sailing" },
                { postId: 8, content: "Swimming" }
            ];
            console.log(`\nFetched posts for user ID: ${userId}`);
            resolve(posts.filter(post => post.postId === userId));
        }, 1500);
    });
}

async function fetchUserDetails(userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        console.log("Invalid userId. It must be a positive integer.");
        return;
    }
    try {
        const [userData, userPosts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);
        console.log(`User Data: ${JSON.stringify(userData)}`);
        console.log(`User Posts: ${JSON.stringify(userPosts)}`);
    } catch (error) {
        console.log(`Error fetching user details: ${error.message}`);
    }
}

// Example usage
fetchUserDetails(1);
fetchUserDetails(2);
fetchUserDetails(3);
fetchUserDetails(4);
fetchUserDetails(5);
fetchUserDetails(6);
