import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const rules = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "Uppercase letter" },
    { regex: /[a-z]/, message: "Lowercase letter" },
    { regex: /[0-9]/, message: "Number" },
    { regex: /[^A-Za-z0-9]/, message: "Special character" },
  ];

  const validatePassword = (password, email) => {
    for (const rule of rules) {
      if (!rule.regex.test(password)) return rule.message;
    }
    if (password.includes(email.split("@")[0])) {
      return "Password cannot contain your email";
    }
    return null;
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    rules.forEach((rule) => {
      if (rule.regex.test(password)) score += 1;
    });
    return score;
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    const validationError = validatePassword(password, email);
    if (validationError) {
      return setError(validationError);
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);

      await updateUserProfile({ displayName, photoURL });
      navigate(from, { replace: true });
    } catch (error) {
      setError("Failed to create an account: " + error.message);
    }
    setLoading(false);
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthText = getStrengthText(passwordStrength);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Sign Up</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input
                type="text"
                placeholder="Display name"
                className="input input-bordered"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center">
                  <div className="flex-1 h-2 bg-gray-300 rounded-full">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(passwordStrength / rules.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium">
                    {strengthText}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full pr-10"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}