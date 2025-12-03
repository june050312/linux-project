require("dotenv").config();
const supabase = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwt_secret = process.env.JWT_SECRET;

const supabaseClient = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const getUser = async (req, res) => {
  const { data, error } = await supabaseClient.from("user").select("*").eq("id", req.user.id);
  if (error) {
    return res.status(500).json({ error: error.message });
  } else {
    const { password, ...userWithoutPassword } = data[0];
    return res.status(200).json(userWithoutPassword);
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabaseClient.from("user").insert({ email, password: hashedPassword, point: 100000 });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseClient.from("user").select("*").eq("email", email);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  const isPasswordValid = await bcrypt.compare(password, data[0].password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ id: data[0].id }, jwt_secret, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });

  return res.status(200).json({ message: "Login successful" });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { data, error } = await supabaseClient.from("user").delete().eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabaseClient.from("user").update({ email, password: hashedPassword }).eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  deleteUser,
  logoutUser,
  updateUser
}