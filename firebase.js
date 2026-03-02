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

    loginTeam: async (teamName, teamCode) => {
        try {
            const { query, where, collection, getDocs } = await import("firebase/firestore");
            const q = query(collection(db, "teams"), where("name", "==", teamName), where("code", "==", teamCode));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
            }
            return null;
        } catch (e) {
            console.error("Login error", e);
            return null;
        }
    },

    getGameStatus: async () => {
        try {
            const { doc, getDoc } = await import("firebase/firestore");
            const snapshot = await getDoc(doc(db, "game", "status"));
            return snapshot.exists() ? snapshot.data() : null;
        } catch (e) {
            console.error(e);
            return null;
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

    deleteTeam: async (teamId) => {
        try {
            const { deleteDoc } = await import("firebase/firestore");
            await deleteDoc(doc(db, "teams", teamId));
            return true;
        } catch (e) {
            console.error("Error deleting team: ", e);
            return false;
        }
    },

    updateGameRound: async (round) => {
        try {
            await updateDoc(doc(db, "game", "status"), {
                currentRound: parseInt(round)
            });
            return true;
        } catch (e) {
            console.error("Error updating game round: ", e);
            return false;
        }
    },

    updateGameState: async (isActive) => {
        try {
            await updateDoc(doc(db, "game", "status"), {
                isActive: isActive
            });
            return true;
        } catch (e) {
            console.error("Error updating game state: ", e);
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
    },

    saveRiddle: async (riddleData) => {
        try {
            const { collection, addDoc, updateDoc, doc } = await import("firebase/firestore");
            if (riddleData.id) {
                const id = riddleData.id;
                delete riddleData.id;
                await updateDoc(doc(db, "riddles", id), riddleData);
            } else {
                await addDoc(collection(db, "riddles"), riddleData);
            }
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    deleteRiddle: async (id) => {
        try {
            const { deleteDoc, doc } = await import("firebase/firestore");
            await deleteDoc(doc(db, "riddles", id));
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    listenToRiddles: (callback) => {
        return onSnapshot(collection(db, "riddles"), (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach(d => arr.push({ id: d.id, ...d.data() }));
            callback(arr);
        });
    }
};
