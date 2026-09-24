import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan', fitnessLevel: 'beginner' },
            { username: 'jamie', email: 'jamie@example.com', displayName: 'Jamie Chen', fitnessLevel: 'intermediate' },
            { username: 'taylor', email: 'taylor@example.com', displayName: 'Taylor Brooks', fitnessLevel: 'advanced' },
        ]);
        await Team.create([
            { name: 'Trail Blazers', members: [users[0]._id, users[1]._id] },
            { name: 'Peak Performers', members: [users[2]._id] },
        ]);
        await Activity.create([
            { user: users[0]._id, type: 'walking', durationMinutes: 30, distanceKilometers: 2.5, points: 25 },
            { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKilometers: 15, points: 45 },
            { user: users[2]._id, type: 'strength', durationMinutes: 50, points: 60 },
        ]);
        await Leaderboard.create([
            { user: users[2]._id, points: 60, rank: 1 },
            { user: users[1]._id, points: 45, rank: 2 },
            { user: users[0]._id, points: 25, rank: 3 },
        ]);
        await Workout.create([
            {
                title: 'Foundation Walk',
                description: 'A steady walk to build a consistent movement habit.',
                fitnessLevel: 'beginner',
                durationMinutes: 30,
                activityType: 'walking',
            },
            {
                title: 'Tempo Ride',
                description: 'A moderate cycling session with short tempo intervals.',
                fitnessLevel: 'intermediate',
                durationMinutes: 45,
                activityType: 'cycling',
            },
            {
                title: 'Power Circuit',
                description: 'A challenging full-body circuit for experienced athletes.',
                fitnessLevel: 'advanced',
                durationMinutes: 50,
                activityType: 'strength',
            },
        ]);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase();
