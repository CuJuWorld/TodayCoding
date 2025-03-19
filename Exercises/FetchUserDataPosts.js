function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched user data for user ID: ${userId}`);
            resolve({ id: userId, name: "John Doe" });
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched posts for user ID: ${userId}`);
            resolve([
                { postId: 1, content: "Hello World!" },
                { postId: 2, content: "Learning JavaScript!" }
            ]);
        }, 1500);
    });
}

async function fetchUserDetails(userId) {
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
