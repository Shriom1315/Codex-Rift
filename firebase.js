import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqeGy4d04hiZ7-wg1MH049H6ywF5fxj60",
    authDomain: "codexrift-8207f.firebaseapp.com",
    projectId: "codexrift-8207f",
    storageBucket: "codexrift-8207f.firebasestorage.app",
    messagingSenderId: "815720191092",
    appId: "1:815720191092:web:30a83465f3745ad125ed21",
    measurementId: "G-F4HRBZCT7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Helper functions for admin
export const dbAdmin = {
    createGame: async () => {
        try {
            await setDoc(doc(db, "game", "status"), {
                isActive: true,
                currentRound: 1,
                createdAt: new Date()
            });
            return true;
        } catch (e) {
            console.error("Error creating game: ", e);
            return false;
        }
    },

    addTeam: async (teamName, teamCode) => {
        try {
            await addDoc(collection(db, "teams"), {
                name: teamName,
                code: teamCode,
                status: "lobby", // 'lobby', 'qualified', 'disqualified'
                score: 0,
                joinedAt: new Date()
            });
            return true;
        } catch (e) {
            console.error("Error adding team: ", e);
            return false;
        }
    },

    updateTeamStatus: async (teamId, newStatus) => {
        try {
            const teamRef = doc(db, "teams", teamId);
            await updateDoc(teamRef, {
                status: newStatus
            });
            return true;
        } catch (e) {
            console.error("Error updating team status: ", e);
            return false;
        }
    },

    updateTeamScore: async (teamId, score) => {
        try {
            const teamRef = doc(db, "teams", teamId);
            await updateDoc(teamRef, {
                score: parseInt(score)
            });
            return true;
        } catch (e) {
            console.error("Error updating score: ", e);
            return false;
        }
    },

    listenToTeams: (callback) => {
        return onSnapshot(collection(db, "teams"), (querySnapshot) => {
            const teams = [];
            querySnapshot.forEach((doc) => {
                teams.push({ id: doc.id, ...doc.data() });
            });
            callback(teams);
        });
    },

    listenToGame: (callback) => {
        return onSnapshot(doc(db, "game", "status"), (doc) => {
            if (doc.exists()) {
                callback(doc.data());
            } else {
                callback(null);
            }
        });
    }
};
