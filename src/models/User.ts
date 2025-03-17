import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string; // You may want to hash passwords
    role: 'Admin' | 'Seller' | 'Buyer';
    createdAt: Date ;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/ // Simple email validation
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['Admin', 'Seller', 'Buyer'],
            default: 'Buyer',
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

const UserModel = mongoose.model<User>('User', UserSchema);
export const createUser = async (userData: User) => {
    const user = new UserModel(userData);
    await user.save();
};
export const getUser = async()=>{
    const users = await UserModel.find().select('-password'); // Exclude passwords
    return users
}

export default UserModel;