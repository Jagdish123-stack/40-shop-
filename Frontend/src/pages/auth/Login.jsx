import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const authError = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      
      // Get user role from response and redirect accordingly
      const userRole = response.data.user.role;
      const routeMap = {
        buyer: '/customer',
        vendor: '/seller',
        driver: '/delivery',
        admin: '/admin'
      };
      
      const redirectPath = routeMap[userRole] || '/customer';
      navigate(redirectPath);
    } catch (error) {
      // error state is already handled in store
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-secondary-fixed">
      <section className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-primary-container overflow-hidden items-center justify-center p-gutter">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 navy-overlay z-10"></div>
          <img
            alt="Global Logistics"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzWxhjWdeI6sQ_M9C7Hvc9TMDCe9Oab1bJRUf0ra6S2qUIBD1ze9PuIJCQv2klnmSRyMUMiJOZF4Ojz8nXzBp_Dt7mBDVJpEuN3zGUuzxRLXsiHGXwv85E7V-42R1vtGinGLtbx3I72nAFXB1ZXprYMQsXVrIY9E2aq-eF0pDaCYcQtMI3gdJFrnfGDRCtvVoH70zmY9y4yfqA61Vq4XaF7ky_LUuDV3Zv3rpMHS_E2xesxSAEKDGQ4H8OClD6BZy6qg7YHFH-yiY"
          />
        </div>

        <div className="relative z-20 max-w-2xl text-white">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
            <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider">Premier Global Marketplace</span>
          </div>
          <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
            Where Suppliers Meet <br />
            <span className="text-secondary-container">the World.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container/80 mb-12 max-w-lg">
            Access the most robust B2B ecosystem in the region. Verified sourcing, seamless settlements, and global logistics handled in one platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl flex items-center gap-4 transition-transform hover:scale-105 duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">verified</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-white">10K+</p>
                <p className="font-label-sm text-label-sm text-white/70">Verified Suppliers</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl flex items-center gap-4 transition-transform hover:scale-105 duration-300">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">bolt</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-white">Fast</p>
                <p className="font-label-sm text-label-sm text-white/70">Settlements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -mr-32 -mb-32"></div>
      </section>

      <section className="flex-1 flex flex-col bg-surface-container-lowest md:rounded-l-[40px] shadow-2xl z-30 overflow-y-auto custom-scrollbar">
        <div className="md:hidden p-6 flex justify-between items-center">
          <span className="font-headline-md text-headline-md font-bold text-primary">BazaarPro</span>
          <button className="text-on-surface-variant">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center px-gutter py-12">
          <div className="hidden md:block mb-12">
            <span className="font-headline-md text-headline-md font-black text-primary tracking-tighter">BazaarPro</span>
          </div>

          <div className="mb-10">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant font-body-md">Sign in to manage your global trade operations.</p>
          </div>

          <div className="flex border-b border-outline-variant mb-8">
            <button className="flex-1 py-4 text-center font-label-md text-label-md border-b-2 border-secondary text-secondary transition-all">
              Login
            </button>
            <Link
              to="/register"
              className="flex-1 py-4 text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all"
            >
              Register
            </Link>
          </div>

          {authError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2 ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full h-14 px-4 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-on-surface"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                type="email"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="password">
                  Password
                </label>
                <a className="font-label-sm text-label-sm text-secondary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  className="w-full h-14 px-4 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-on-surface"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" id="remember" type="checkbox" />
              <label className="font-body-md text-body-md text-on-surface-variant" htmlFor="remember">
                Remember me for 30 days
              </label>
            </div>

            <button
              className={`w-full h-14 bg-secondary text-white rounded-xl font-label-md text-label-md saffron-glow hover:bg-secondary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-80 pointer-events-none' : ''
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-label-sm">
              <span className="px-4 bg-surface-container-lowest text-on-surface-variant font-label-sm">Or continue with</span>
            </div>
          </div>

          <button className="w-full h-14 border border-outline-variant bg-white rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface transition-all flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <footer className="mt-12 text-center text-on-surface-variant font-label-sm space-y-4">
            <div className="flex justify-center gap-6">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Help
              </a>
            </div>
            <p>© 2024 BazaarPro. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </main>
  );
}