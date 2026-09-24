import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const router = Router();
router.get('/users', async (_request, response, next) => {
    try {
        response.json(await User.find().sort({ createdAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', async (request, response, next) => {
    try {
        response.status(201).json(await User.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams', async (_request, response, next) => {
    try {
        response.json(await Team.find().populate('members', 'username displayName'));
    }
    catch (error) {
        next(error);
    }
});
router.post('/teams', async (request, response, next) => {
    try {
        response.status(201).json(await Team.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities', async (request, response, next) => {
    try {
        const filter = typeof request.query.user === 'string' ? { user: request.query.user } : {};
        response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/activities', async (request, response, next) => {
    try {
        response.status(201).json(await Activity.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard', async (_request, response, next) => {
    try {
        response.json(await Leaderboard.find().populate('user', 'username displayName').sort({ points: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts', async (request, response, next) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        const fitnessLevel = typeof request.query.fitnessLevel === 'string' ? request.query.fitnessLevel : undefined;
        response.json(fitnessLevel ? workouts.filter((workout) => workout.fitnessLevel === fitnessLevel) : workouts);
    }
    catch (error) {
        next(error);
    }
});
router.post('/workouts', async (request, response, next) => {
    try {
        response.status(201).json(await Workout.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
export default router;
