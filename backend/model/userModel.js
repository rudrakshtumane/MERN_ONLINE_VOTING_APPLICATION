const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    dob: {type: Date, required: true},
    guardianName: {type: String},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    aadhar: {type: String, required: true},
    profileImage: { type: String },
    role:{ type: String, enum: ['admin', 'user'], default: 'user' }
});

// Hash password before saving the user
userSchema.pre('save',async function (next){
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10); // Increase the salt rounds for better security
            user.password = await bcrypt.hash(user.password, salt);
            console.log('Password hashed successfully');
        } catch (error) {
            return next(error); // Pass the error to the next middleware
        }
    }
    next();
});

userSchema.methods.comparePassword =  async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('user',userSchema);