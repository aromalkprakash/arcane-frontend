import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '@/api/userUrl';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const GoogleLogin = () => {
    const router = useRouter();

    const responseGoogle = async (authResult: any) => {
      try {
          console.log('Google auth result:', authResult);
          if (authResult?.code) {
              const result = await googleAuth(authResult.code);
            //   console.log('Backend response:', result);

                  toast.success('Logged in successfully');
                  console.log('Redirecting to home page');
                  router.push("/");
            
          } else {
              toast.error('Authorization code is missing');
          }
      } catch (error: any) {
          toast.error(`An error occurred during Google login: ${error.message}`);
          console.error('Error:', error);
      }
  };
  
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (error) => {
            toast.error('Google login failed');
            console.error('Login Error:', error);
        },
        flow: 'auth-code',
    });

    return (
        <div className="google">
            <button onClick={googleLogin} className="text-black">Sign in with Google</button>
        </div>
    );
};

export default GoogleLogin;
