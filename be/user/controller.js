require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseClient = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const getUser = async (req, res) => {
  const { data, error } = await supabaseClient.from("user").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseClient.from("user").insert({ email, password, point: 100000 });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseClient.from("user").select("*").eq("email", email).eq("password", password);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabaseClient.from("user").delete().eq("id", id);
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
}