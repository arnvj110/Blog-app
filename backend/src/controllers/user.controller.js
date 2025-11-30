import UserProfile from "../models/user.model.js";

// export const createUserProfile = async (req, res) => {
//   try {
//     const { username, bio, avatar } = req.body;

//     const profile = await UserProfile.create({
//       supabase_id: req.user.id,  // from supabase token
//       username,
//       bio,
//       avatar,
//     });

//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      supabase_id: req.user.id,
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params; 
    const profile = await UserProfile.findById(id);
    if (!profile) return res.status(404).json({ error: "User not found" });
    res.json({
        username : profile.username,
        bio : profile.bio,
        avatar : profile.avatar,

    });
    // res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
