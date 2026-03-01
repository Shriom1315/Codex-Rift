import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, doc, setDoc } from "firebase/firestore";

// TODO: Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
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
