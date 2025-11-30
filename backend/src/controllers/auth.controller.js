import { supabase } from "../config/supabase.js";
import UserProfile from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1️⃣ Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    const supabaseUser = data.user;

    // 2️⃣ Create profile in MongoDB
    await UserProfile.create({
      supabase_id: supabaseUser.id,
      username,
      bio: "",
      avatar: "",
    });

    // 3️⃣ Response
    return res.json({
      success: true,
      msg: "Account created. Please verify your email.",
      user_id: supabaseUser.id,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    const user = data.user;
    const session = data.session;

    // 2️⃣ Optional: fetch MongoDB profile if needed
    const profile = await UserProfile.findOne({ supabase_id: user.id });

    // 3️⃣ Respond with token + user info
    return res.json({
      success: true,
      token: session?.access_token,
      user: {
        id: user.id,
        email: user.email,
        username: profile?.username || "",
        bio: profile?.bio || "",
        avatar: profile?.avatar || "",
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
