
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Query the database for the management user
      const { data: managementUsers, error } = await supabase
        .from('management_users')
        .select('*')
        .eq('username', credentials.username)
        .eq('is_active', true)
        .single();

      if (error || !managementUsers) {
        throw new Error('Invalid credentials');
      }

      // Validate password against database hash
      console.log('Login attempt:', {
        username: credentials.username,
        userFound: !!managementUsers,
        inputPassword: credentials.password,
        storedHash: managementUsers.password_hash,
        hashLength: managementUsers.password_hash?.length
      });
      
      try {
        const isPasswordValid = await bcrypt.compare(credentials.password, managementUsers.password_hash);
        console.log('Password validation result:', isPasswordValid);

        if (!isPasswordValid) {
          console.error('Authentication failed - password mismatch');
          console.error('Input password:', `"${credentials.password}"`);
          console.error('Stored hash:', managementUsers.password_hash);
          throw new Error('Invalid credentials');
        }
      } catch (bcryptError) {
        console.error('BCrypt comparison error:', bcryptError);
        throw new Error('Invalid credentials');
      }
      
      console.log('Authentication successful!');

      // Update last login
      await supabase
        .from('management_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', managementUsers.id);

      // Create session data
      const sessionData = {
        id: managementUsers.id,
        username: managementUsers.username,
        role: managementUsers.role,
        sessionId: Date.now().toString(),
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('adminSession', JSON.stringify(sessionData));

      toast({
        title: "Login Successful",
        description: `Welcome back, ${managementUsers.username}!`,
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-gray-600">Enter your credentials to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
