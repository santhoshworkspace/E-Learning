import Mentor from '../models/mentorsModels.js';

export const signup = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(200).json('Mentor signup successful');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const mentor = await Mentor.findOne({ email: req.body.email });
        if (!mentor || mentor.password !== req.body.password) {
            return res.status(401).json('Invalid credentials');
        }
        res.status(200).json(mentor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
