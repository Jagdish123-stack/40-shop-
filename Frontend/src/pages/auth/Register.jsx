import React, { useState } from 'react';

export default function Register() {
  const [role, setRole] = useState('buyer');

  return (
    <>
      <style>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .saffron-glow:focus-within {
            box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 4s ease-in-out infinite;
            animation-delay: 2s;
        }
      `}</style>

      <div className="bg-surface-container-lowest font-body-md text-on-surface overflow-x-hidden min-h-screen flex flex-col md:flex-row">
        {/* Left Hero Section */}
        <section className="relative hidden md:flex md:w-5/12 lg:w-1/2 min-h-screen items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              alt="Global Logistics and Trade" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWNH_Y2Eh_IFRdnAf3A0U7BHZ8Ii69lsCeYs7i_zLazzZQoYshJXrOOEO4370f7h-PKkwn0aYZmVGSCfUzHzj-9q9yJ6r4ab2b7Wdc7SN0xZErMRGXaNHB0NNjtQHQIk3uqavDbMRqd8nm7bjYDKj5zf0pjwsqbfiy5D5xoRQUCbuibDlXbCoq9SkaTzeNjxjvdBL7FCfiiH0KiQCLxdaJItig21GU0hRJW5N8qCh85wsl1fTsL9LKo-JRbbMSjAIapbOziAzIUI0" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/90 via-primary-container/70 to-secondary/30 mix-blend-multiply"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 px-margin-desktop w-full max-w-2xl">
            <div className="mb-12">
              <h1 className="font-display-lg text-display-lg text-white mb-6">
                Where Suppliers<br />Meet the World
              </h1>
              <p className="font-body-lg text-body-lg text-white/80 max-w-md">
                Join BazaarPro to scale your business across borders with India's most trusted wholesale commerce infrastructure.
              </p>
            </div>
            
            {/* Floating Glass Cards */}
            <div className="space-y-6">
              <div className="glass-card animate-float p-6 rounded-xl flex items-center gap-4 w-fit">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-white">10K+</p>
                  <p className="font-label-md text-label-md text-white/70">Verified Suppliers</p>
                </div>
              </div>
              
              <div className="glass-card animate-float-delayed p-6 rounded-xl flex items-center gap-4 w-fit ml-auto mr-12">
                <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
                </div>
                <div>
                  <p className="font-headline-md text-headline-md text-white">Fast Settlements</p>
                  <p className="font-label-md text-label-md text-white/70">T+1 Payment Cycles</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Element */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-container to-transparent opacity-50"></div>
        </section>

        {/* Right Form Section */}
        <section className="flex-1 flex flex-col items-center justify-start py-12 px-margin-mobile md:px-margin-desktop overflow-y-auto custom-scrollbar">
          <div className="w-full max-w-lg">
            {/* Header / Logo */}
            <div className="flex justify-between items-center mb-10">
              <div className="font-headline-md text-headline-md font-bold text-primary">
                BazaarPro
              </div>
              <a className="text-secondary font-label-md hover:underline" href="#">Need help?</a>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-outline-variant mb-10">
              <button className="px-8 py-4 font-label-md text-on-surface-variant hover:text-primary transition-colors">
                Login
              </button>
              <button className="px-8 py-4 font-label-md text-secondary border-b-2 border-secondary font-bold">
                Register
              </button>
            </div>

            {/* Registration Form */}
            <div className="space-y-8">
              <header>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Create your account</h2>
                <p className="text-on-surface-variant">Choose your role to get started with the right tools.</p>
              </header>

              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-4">
                <label className="relative cursor-pointer">
                  <input 
                    className="peer sr-only" 
                    name="role" 
                    type="radio" 
                    value="buyer" 
                    checked={role === 'buyer'}
                    onChange={() => setRole('buyer')}
                  />
                  <div className="h-full p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 peer-checked:border-secondary peer-checked:bg-secondary-fixed/10 hover:border-secondary/50">
                    <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-secondary">shopping_bag</span>
                    <span className="font-label-sm text-label-sm text-center">Buyer</span>
                  </div>
                </label>
                
                <label className="relative cursor-pointer">
                  <input 
                    className="peer sr-only" 
                    name="role" 
                    type="radio" 
                    value="vendor"
                    checked={role === 'vendor'}
                    onChange={() => setRole('vendor')}
                  />
                  <div className="h-full p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 peer-checked:border-secondary peer-checked:bg-secondary-fixed/10 hover:border-secondary/50">
                    <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-secondary">store</span>
                    <span className="font-label-sm text-label-sm text-center">Vendor</span>
                  </div>
                </label>
                
                <label className="relative cursor-pointer">
                  <input 
                    className="peer sr-only" 
                    name="role" 
                    type="radio" 
                    value="driver"
                    checked={role === 'driver'}
                    onChange={() => setRole('driver')}
                  />
                  <div className="h-full p-4 border border-outline-variant rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 peer-checked:border-secondary peer-checked:bg-secondary-fixed/10 hover:border-secondary/50">
                    <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-secondary">local_shipping</span>
                    <span className="font-label-sm text-label-sm text-center">Driver</span>
                  </div>
                </label>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Full Name</label>
                  <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="Arjun Sharma" type="text" />
                </div>
                
                <div className="space-y-1">
                  <label className="font-label-md text-on-surface-variant ml-1">Shop License Number</label>
                  <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="Enter your shop license number" type="text" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Email Address</label>
                    <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="arjun@example.com" type="email" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Phone Number</label>
                    <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="+91 98765 43210" type="tel" />
                  </div>
                </div>

                {/* Conditional Driver Fields */}
                <div className={`space-y-5 animate-in fade-in slide-in-from-top-4 duration-300 ${role === 'driver' ? 'block' : 'hidden'}`}>
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Vehicle Type</label>
                    <select className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow">
                      <option value="">Select vehicle type</option>
                      <option value="bike">Motorcycle</option>
                      <option value="mini-truck">Mini Truck (Chota Hathi)</option>
                      <option value="heavy-truck">Heavy Truck</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Driving License Number</label>
                    <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="DL-142023000XXXX" type="text" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Password</label>
                    <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="••••••••" type="password" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-on-surface-variant ml-1">Confirm Password</label>
                    <input className="w-full h-14 px-4 bg-surface-container rounded-lg border-transparent focus:border-secondary focus:ring-0 transition-all saffron-glow" placeholder="••••••••" type="password" />
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input className="mt-1 rounded text-secondary focus:ring-secondary" type="checkbox" />
                  <p className="text-label-sm text-on-surface-variant leading-tight">
                    I agree to BazaarPro's <a className="text-secondary underline" href="#">Terms of Service</a> and <a className="text-secondary underline" href="#">Privacy Policy</a>.
                  </p>
                </div>

                <button className="w-full h-14 bg-secondary text-white font-headline-md rounded-lg hover:bg-secondary/90 transform active:scale-[0.98] transition-all shadow-lg shadow-secondary/20" type="submit">
                  Create Account
                </button>
              </form>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 text-on-surface-variant text-label-sm font-medium">OR</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              <button className="w-full h-14 border border-outline-variant rounded-lg flex items-center justify-center gap-3 hover:bg-surface-container transition-colors transform active:scale-[0.98]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z" fill="#EA4335"></path>
                </svg>
                <span className="font-label-md text-on-surface">Continue with Google</span>
              </button>

              <footer className="text-center pt-4">
                <p className="text-label-md text-on-surface-variant">
                  Already have an account? <a className="text-secondary font-bold hover:underline" href="#">Sign In</a>
                </p>
              </footer>
            </div>
          </div>

          {/* Simple Footer from JSON spec */}
          <footer className="w-full mt-24 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-outline-variant bg-surface">
            <div className="font-headline-sm text-headline-sm font-black text-primary">BazaarPro</div>
            <div className="flex gap-6">
              <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors duration-200" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors duration-200" href="#">Terms of Service</a>
              <a className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors duration-200" href="#">Contact Support</a>
            </div>
            <div className="text-on-surface font-label-sm text-label-sm">© 2024 BazaarPro. All rights reserved.</div>
          </footer>
        </section>
      </div>
    </>
  );
}