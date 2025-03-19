function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if the user ID is valid
            if (userId < 1) {
                reject(new Error("Invalid user ID.")); // Reject if invalid
            } else {
                console.log(`Fetched user data for user ID: ${userId}`);
                resolve({ id: userId, name: "John Doe" }); // Resolve with user data
            }
        }, 1000); // Simulate a 1-second delay
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if the user ID is valid
            if (userId < 1) {
                reject(new Error("Invalid user ID.")); // Reject if invalid
            } else {
                console.log(`Fetched posts for user ID: ${userId}`);
                resolve([
                    { postId: 1, content: "Hello World!" },
                    { postId: 2, content: "Learning JavaScript!" }
                ]); // Resolve with an array of posts
            }
        }, 1500); // Simulate a 1.5-second delay
    });
}

async function fetchUserDetails(userId) {
    try {
        // Use Promise.all to fetch user data and posts concurrently
        const [userData, userPosts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);
        
        // Log the fetched user data and posts
        console.log(`User Data:`, userData);
        console.log(`User Posts:`, userPosts);
    } catch (error) {
        // Catch and log any errors that occur during fetching
        console.log(`Error fetching user details: ${error.message}`);
    }
}

// Example usage
fetchUserDetails(1);  // Valid user ID
fetchUserDetails(-1); // Invalid user ID