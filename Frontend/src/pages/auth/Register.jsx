import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { authApi } from '../../api/auth.api';

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [role, setRole] = useState('buyer');
  const [showDriverFields, setShowDriverFields] = useState(false);
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    gstin: '',
    udyamNumber: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setShowDriverFields(value === 'driver');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role,
        businessName: form.businessName,
        gstin: form.gstin,
        udyamNumber: form.udyamNumber,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      };

      const data = await authApi.register(payload);

      localStorage.setItem('token', data.data.token);
      await login(form.email, form.password);

      // Redirect based on role
      const routeMap = {
        buyer: '/customer',
        vendor: '/seller',
        driver: '/delivery',
        admin: '/admin'
      };
      navigate(routeMap[role] || '/customer');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-surface-container-lowest font-body-md text-on-surface overflow-x-hidden">
      <section className="relative hidden md:flex md:w-5/12 lg:w-1/2 min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Global Logistics and Trade"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWNH_Y2Eh_IFRdnAf3A0U7BHZ8Ii69lsCeYs7i_zLazzZQoYshJXrOOEO4370f7h-PKkwn0aYZmVGSCfUzHzj-9q9yJ6r4ab2b7Wdc7SN0xZErMRGXaNHB0NNjtQHQIk3uqavDbMRqd8nm7bjYDKj5zf0pjwsqbfiy5D5xoRQUCbuibDlXbCoq9SkaTzeNjxjvdBL7FCfiiH0KiQCLxdaJItig21GU0hRJW5N8qCh85wsl1fTsL9LKo-JRbbMSjAIapbOziAzIUI0"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/90 via-primary-container/70 to-secondary/30 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 px-margin-desktop w-full max-w-2xl">
          <div className="mb-12">
            <h1 className="font-display-lg text-display-lg text-white mb-6">
              Where Suppliers
              <br />
              Meet the World
            </h1>
            <p className="font-body-lg text-body-lg text-white/80 max-w-md">
              Join BazaarPro to scale your business across borders with India's most trusted wholesale commerce infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-card animate-float p-6 rounded-xl flex items-center gap-4 w-fit">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-white">10K+</p>
                <p className="font-label-md text-label-md text-white/70">Verified Suppliers</p>
              </div>
            </div>
            <div className="glass-card animate-float-delayed p-6 rounded-xl flex items-center gap-4 w-fit ml-auto mr-12">
              <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  speed
                </span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-white">Fast Settlements</p>
                <p className="font-label-md text-label-md text-white/70">T+1 Payment Cycles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-start py-12 px-margin-mobile md:px-margin-desktop overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-lg">
          <div className="flex justify-between items-center mb-10">
            <div className="font-headline-md text-headline-md font-bold text-primary">BazaarPro</div>
            <Link className="text-secondary font-label-md hover:underline" to="/login">
              Login
            </Link>
          </div>

          <div className="flex border-b border-outline-variant mb-10">
            <Link className="px-8 py-4 font-label-md text-on-surface-variant hover:text-primary transition-colors" to="/login">
              Login
            </Link>
            <button className="px-8 py-4 font-label-md text-secondary border-b-2 border-secondary font-bold">Register</button>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-8">
            <header>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Create your account</h2>
              <p className="text-on-surface-variant">Choose your role to get started with the right tools.</p>
            </header>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'buyer', label: 'Buyer', icon: 'shopping_bag' },
                { value: 'vendor', label: 'Vendor', icon: 'store' },
                { value: 'driver', label: 'Driver', icon: 'local_shipping' },
              ].map((option) => (
                <label key={option.value} className="relative cursor-pointer">
                  <input
                    className="peer sr-only"
                    name="role"
                    type="radio"
                    value={option.value}
                    checked={role === option.value}
                    onChange={() => handleRoleChange(option.value)}
                  />
                  <div className="h-full p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 peer-checked:border-secondary peer-checked:bg-secondary-fixed/10 hover:border-secondary/50">
                    <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-secondary">{option.icon}</span>
                    <span className="font-label-sm text-label-sm text-center">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="font-label-md text-on-surface-variant ml-1">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                  placeholder="Arjun Sharma"
                  type="text"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-on-surface-variant ml-1">Shop License Number</label>
                <input
                  name="udyamNumber"
                  value={form.udyamNumber}
                  onChange={handleChange}
                  className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                  placeholder="Enter your shop license number"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Email Address</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="arjun@example.com"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="+91 98765 43210"
                    type="tel"
                    required
                  />
                </div>
              </div>

              <div className={`space-y-5 ${showDriverFields ? 'block' : 'hidden'}`} id="driver-fields">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Vehicle Type</label>
                  <select
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Heavy Truck">Heavy Truck</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Driving License Number</label>
                  <input
                    name="gstin"
                    value={form.gstin}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="DL-142023000XXXX"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Password</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="Mumbai"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="Maharashtra"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Pincode</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow"
                    placeholder="400001"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 rounded text-secondary focus:ring-secondary" type="checkbox" required />
                <p className="text-label-sm text-on-surface-variant leading-tight">
                  I agree to BazaarPro&apos;s{' '}
                  <a className="text-secondary underline" href="#">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="text-secondary underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <button
                className="w-full h-14 bg-secondary text-white font-headline-md rounded-lg hover:bg-secondary/90 transform active:scale-[0.98] transition-all shadow-lg shadow-secondary/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink mx-4 text-on-surface-variant text-label-sm font-medium">OR</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            <button className="w-full h-14 border border-outline-variant rounded-lg flex items-center justify-center gap-3 hover:bg-surface-container transition-colors transform active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-label-md text-on-surface">Continue with Google</span>
            </button>

            <footer className="text-center pt-4">
              <p className="text-label-md text-on-surface-variant">
                Already have an account?{' '}
                <Link className="text-secondary font-bold hover:underline" to="/login">
                  Sign In
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}