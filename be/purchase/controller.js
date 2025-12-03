require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseClient = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const purchaseGoods = async (req, res) => {
  const { goods_id, count } = req.body;
  const purchase = {
    goods_id,
    count,
    user_id: req.user.id,
  }
  const { data, error } = await supabaseClient.from("purchase_list").insert(purchase);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};

const cancelPurchase = async (req, res) => {
  const { id } = req.body;
  const { data, error } = await supabaseClient.from("purchase_list").delete().eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
}

const getPurchaseList = async (req, res) => {
  const { data, error } = await supabaseClient.from("purchase_list").select("*").eq("user_id", req.user.id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
}

module.exports = {
  purchaseGoods,
  cancelPurchase,
  getPurchaseList
};