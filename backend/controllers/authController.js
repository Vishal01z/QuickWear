// Example controller functions
export const register = async (req, res) => {
  try {
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Create user in DB
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // 1. Validate credentials
    // 2. Check user exists
    // 3. Verify password
    // 4. Generate JWT token
    res.json({ token: "generated_jwt_token" });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};