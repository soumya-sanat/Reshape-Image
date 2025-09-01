import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AtSignIcon, CheckIcon, EyeIcon, EyeOffIcon, User, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' }
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score === 3) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter a password';
    if (score <= 2) return 'Weak password';
    if (score === 3) return 'Medium password';
    return 'Strong password';
  };

  return (
    <Card className="flex flex-col w-xl max-md:w-sm px-4 py-6 shadow-lg">
      <CardHeader className="text-start px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold">Create your account</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your email and password to create a new account.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full px-4 sm:px-6">
        <form className="space-y-4 sm:space-y-5">
          {/* Username */}
          <div className="*:not-first:mt-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                className="peer ps-9"
                placeholder="Username"
                aria-label="Username"
                type="text"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <User size={16} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="*:not-first:mt-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                className="peer ps-9"
                placeholder="Email"
                aria-label="Email"
                type="email"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <AtSignIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="*:not-first:mt-2">
              <Label htmlFor="password" className="mb-1">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  className="pe-9"
                  placeholder="Password"
                  type={isVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby={`password-description`}
                />
                <button
                  className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-colors"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden="true" />
                  ) : (
                    <EyeIcon size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="*:not-first:mt-2">
              <Label htmlFor="confirm-password" className="mb-1">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  className="pe-9"
                  placeholder="Confirm Password"
                  type={isVisible ? 'text' : 'password'}
                  aria-describedby={`password-confirmation-description`}
                />
                <button
                  className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-colors"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden="true" />
                  ) : (
                    <EyeIcon size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div>
            <div
              className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(
                  strengthScore
                )} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              ></div>
            </div>
            <p
              id="password-description"
              className="text-foreground mb-2 text-xs sm:text-sm font-medium"
            >
              {getStrengthText(strengthScore)}. Must contain:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm" aria-label="Password requirements">
              {strength.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <CheckIcon size={16} className="text-emerald-500" aria-hidden="true" />
                  ) : (
                    <XIcon size={16} className="text-muted-foreground/80" aria-hidden="true" />
                  )}
                  <span className={`${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                    {req.text}
                    <span className="sr-only">
                      {req.met ? ' - Requirement met' : ' - Requirement not met'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms */}
          <div className="flex flex-col w-full items-start gap-2">
            <div className="w-full flex items-center justify-start gap-2">
              <input type="checkbox" id="tc" />
              <Label htmlFor="tc" className="cursor-pointer text-xs sm:text-sm">
                I agree to
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 p-0 m-0 hover:text-blue-400"
                >
                  Terms &amp; Conditions
                </a>
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4 text-sm sm:text-base">
            Create Account
          </Button>

          {/* Login Link */}
          <div className="text-center text-xs sm:text-sm">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={() => navigate('/auth/login')}
              className="underline underline-offset-4 p-0 m-0 hover:text-blue-400"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { SignupForm };
