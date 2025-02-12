import { supabase } from '@/utils/supabase/client';
import { User } from '@/types';

export const fetchAllUsers = async (username?: string, email?: string, isActive?: boolean) =>{
    let query = supabase.from('users').select('*');

    if (username) {
        query = query.ilike('username', `%${username}%`);
    }
    if (email) {
        query = query.ilike('email', `%${email}%`);
    }
    if (email) {
        query = query.eq('isActive', isActive);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as User[];
}
export class UserService {

    static async fetchUserById(id: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }

        return data;
    }

    // Register User
    static async registerUser(username: string, email: string, password: string): Promise<string | null> {
        const encryptedPassword = this.encryptPassword(password);

        const { error } = await supabase.from('users').insert([{ username, email, password: encryptedPassword, isActive: false, created_at: new Date() }]);

        if (error) {
            return error.message;
        }

        return null;
    }

    // Login User
    static async loginUser(email: string, password: string): Promise<string | null> {
        const encryptedPassword = this.encryptPassword(password);

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', encryptedPassword)
            .single();

        if (error) {
            return 'Login unsuccessful. Please check your email and password.';
        }

        return data ? 'Login successful!' : 'Login unsuccessful. Please check your email and password.';
    }

    // Forgot Password
    static async forgotPassword(email: string): Promise<string | null> {
        //const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        const error = { message: "Error" };
        if (error) {
            return error.message;
        }

        return 'A reset password link has been sent to your email.';
    }

    // Update Password
    static async updatePassword(email: string, newPassword: string): Promise<string | null> {
        const encryptedPassword = this.encryptPassword(newPassword);

        const { error } = await supabase
            .from('users')
            .update({ password: encryptedPassword })
            .eq('email', email);

        if (error) {
            return error.message;
        }

        return 'Password updated successfully!';
    }

    // Activate or Deactivate User
    static async toggleUserActiveStatus(email: string, isActive: boolean): Promise<string | null> {
        const { error } = await supabase
            .from('users')
            .update({ isActive })
            .eq('email', email);

        if (error) {
            return error.message;
        }

        return isActive ? 'User activated successfully!' : 'User deactivated successfully!';
    }

    // Password Encryption
    private static encryptPassword(password: string): string {
        // Replace this with actual encryption logic
        return btoa(password);
    }
}
