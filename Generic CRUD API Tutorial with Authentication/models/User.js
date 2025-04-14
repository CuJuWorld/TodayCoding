// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true, // removes spaces from the start and end of text before saving.
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // KEEP THIS
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Password Hashing Middleware...
UserSchema.pre('save', async function (next) {
    console.log('Attempting to hash password...'); // <-- Add for debugging
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hash.'); // <-- Add for debugging
        return next();
    }

    try {
        console.log('Hashing password now...'); // <-- Add for debugging
        this.password = await bcrypt.hash(this.password, 10); // Hash with salt round 10
        console.log('Password hashing complete.'); // <-- Add for debugging
        next(); // Proceed to save
    } catch (error) {
        console.error('Error hashing password:', error); // <-- Add for debugging
        next(error); // Pass error to the next middleware/handler
    }
});

// Password Comparison Method...
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // 'this.password' refers to the hashed password stored in the document
        // It's crucial that the user was fetched WITH the password field selected!
        // (The login controller does this with .select('+password'))
        console.log(`Comparing candidate [<span class="math-inline">\{candidatePassword\}\] with stored hash \[</span>{this.password}]`); // Optional: Add log
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Comparison result:', isMatch); // Optional: Add log
        return isMatch;
    } catch (error) {
        console.error('Error during password comparison:', error); // Optional: Add log
        // It's generally better to just return false or throw the specific bcrypt error
        // rather than throwing a generic new Error('Password comparison failed');
        return false; // Or throw error;
    }
};

// Virtual for Full Name...
// Optimized version
UserSchema.virtual('fullName').get(function () {
    // Use nullish coalescing (??) to handle null/undefined safely
    // Trim whitespace from each part
    // Filter out any parts that are empty strings after trimming
    // Join the remaining parts with a space
    return [this.firstName ?? '', this.lastName ?? '']
        .map(name => name.trim())
        .filter(name => name) // Keeps only truthy values (non-empty strings)
        .join(' ') || ''; // Return the joined string, or an empty string if no valid parts exist
});

// Remember to ensure virtuals are included in output if needed:
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', UserSchema);
export default User;