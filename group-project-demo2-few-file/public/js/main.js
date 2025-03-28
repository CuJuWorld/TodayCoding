let currentItemId = null; // To hold the ID of the item being edited

async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = ''; // Clear the list
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label><strong>Name:</strong> ${item.name}</label><br>
            <label><strong>Description:</strong> ${item.description}</label><br>
            ${item.image ? `<img src="uploads/${item.image}" alt="${item.name}" style="width:100px;height:auto;">` : '<p>No image available</p>'}
            <br> 
            <button onclick="deleteItem('${item._id}')">Delete</button>
            <button onclick="editItem('${item._id}', '${item.name}', '${item.description}', '${item.image}')">Edit</button>
        `;
        itemsList.appendChild(li);
    });
}

function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result; // Set the preview image source
            imagePreview.style.display = 'block'; // Show the image
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        imagePreview.src = ''; // Clear the preview
        imagePreview.style.display = 'none'; // Hide the image
    }
}

async function createItem() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0]; // Get the file

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageFile); // Append the image file
  
    let url = currentItemId ? `/api/items/${currentItemId}` : '/api/items';
    
    const response = await fetch(url, {
        method: currentItemId ? 'PUT' : 'POST', // Use PUT for update, POST for create
        body: formData // Send the form data
    });

    await response.json();
    fetchItems(); // Refresh the item list
    clearForm(); // Clear the form fields
}

function clearForm() {
    document.getElementById('itemForm').reset(); // Clear form fields
    currentItemId = null; // Reset current item ID
    document.getElementById('submitButton').textContent = 'Create Item'; // Reset button text
    document.getElementById('imagePreview').style.display = 'none'; // Hide the image preview
}

function editItem(id, name, description, image) {
    currentItemId = id; // Set the current item ID
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('submitButton').textContent = 'Update Item'; // Change button text

    // Show the existing image
    const imagePreview = document.getElementById('imagePreview');
    if (image) {
        imagePreview.src = `uploads/${image}`;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
}

async function deleteItem(id) {
    await fetch(`/api/items/${id}`, {
        method: 'DELETE'
    });
    fetchItems(); // Refresh the item list
}

// Initial fetch of items
fetchItems();