import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect for background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(isLogin ? 'Login submitted' : 'Signup submitted', { email, password, name });
  };

  return (
    <div 
      className="flex h-screen items-center justify-center bg-black p-4"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 33, 64, 0.8), rgba(6, 11, 25, 1) 50%)`
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-blue-500/20 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-indigo-500/20 blur-xl"></div>
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-indigo-600 to-blue-500"></div>
        
        {/* Main content */}
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
                <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-blue-300" />
              </div>
              <span className="text-xl font-bold text-white">NeoShop</span>
            </div>
            <div className="flex space-x-1">
              <div className={`h-2 w-10 rounded-full transition-all duration-300 ${isLogin ? 'bg-blue-400' : 'bg-gray-700'}`}></div>
              <div className={`h-2 w-10 rounded-full transition-all duration-300 ${!isLogin ? 'bg-blue-400' : 'bg-gray-700'}`}></div>
            </div>
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-white">
            {isLogin ? 'Welcome back' : 'Join the future'}
          </h2>
          <p className="mb-6 text-gray-400">
            {isLogin ? 'Access your digital shopping universe' : 'Create your digital identity'}
          </p>
          
          <form onSubmit={handleSubmit} className={`transition-all duration-300 ${isAnimating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
            {!isLogin && (
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 p-2.5 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 p-2.5 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 p-2.5 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {isLogin && (
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            )}
            
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute bottom-0 left-0 h-full w-0 bg-gradient-to-r from-indigo-700 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </form>
          
          <div className="mt-6 flex items-center justify-center">
            <span className="text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={toggleForm}
              className="ml-2 text-sm font-medium text-blue-400 hover:text-blue-300 focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
          
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-4 flex-shrink text-sm text-gray-400">Or continue with</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800/60 px-5 py-2.5 text-center text-sm font-medium text-gray-300 backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;