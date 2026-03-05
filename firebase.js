import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, doc, setDoc } from "firebase/firestore";
import { gameData } from './data.js';

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
            const riddlePool = gameData.round1Riddles || [];
            const assignedRiddles = [...riddlePool].sort(() => Math.random() - 0.5).slice(0, 5);

            await addDoc(collection(db, "teams"), {
                name: teamName,
                code: teamCode,
                status: "lobby", // 'lobby', 'qualified', 'disqualified'
                score: 0,
                joinedAt: new Date(),
                progress: {
                    round1: {
                        currentRiddle: 0,
                        solved: [],
                        answers: {},
                        riddles: assignedRiddles
                    },
                    round2: { currentLocation: 0, solved: [], codes: {} },
                    round3: { currentClue: 0, solved: [], codes: {} },
                    superpowers: { round1: false, round2: false }
                }
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
                const teamDoc = querySnapshot.docs[0];
                const teamData = teamDoc.data();
                const teamId = teamDoc.id;

                // Record login session
                await updateDoc(doc(db, "teams", teamId), {
                    lastLoginAt: new Date(),
                    sessionActive: true
                });

                return { id: teamId, ...teamData };
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

    updateTeamProgress: async (teamId, progressData) => {
        try {
            const teamRef = doc(db, "teams", teamId);
            await updateDoc(teamRef, {
                ...progressData,
                lastActivityAt: new Date()
            });
            return true;
        } catch (e) {
            console.error("Error updating progress: ", e);
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
    },

    claimSuperpower: async (round, teamId, teamName) => {
        try {
            const { doc, getDoc, runTransaction } = await import("firebase/firestore");
            const gameRef = doc(db, "game", "status");

            return await runTransaction(db, async (transaction) => {
                const gameDoc = await transaction.get(gameRef);
                if (!gameDoc.exists()) return null;

                const gameData = gameDoc.data();
                const claimedBy = gameData.superpowersClaimed || {};

                if (!claimedBy[round]) {
                    // Claim it!
                    claimedBy[round] = { teamId, teamName, claimedAt: new Date() };
                    transaction.update(gameRef, { superpowersClaimed: claimedBy });

                    // Update team's superpower list
                    const teamRef = doc(db, "teams", teamId);
                    const teamDoc = await transaction.get(teamRef);
                    const teamData = teamDoc.data();
                    const currentProgress = teamData.progress || {};
                    const superpowers = currentProgress.superpowers || { round1: false, round2: false };
                    superpowers[round] = true;

                    transaction.update(teamRef, {
                        "progress.superpowers": superpowers,
                        lastActivityAt: new Date()
                    });

                    return { success: true, teamName };
                } else {
                    return { success: false, claimedBy: claimedBy[round].teamName };
                }
            });
        } catch (e) {
            console.error("Error claiming superpower: ", e);
            return null;
        }
    },

    claimSuperpowerWithCode: async (round, teamId, enteredCode, correctCode) => {
        try {
            const { doc, runTransaction } = await import("firebase/firestore");
            const gameRef = doc(db, "game", "status");

            if (enteredCode.toUpperCase() !== correctCode.toUpperCase()) {
                return { success: false, error: "Invalid sacred code" };
            }

            return await runTransaction(db, async (transaction) => {
                const gameDoc = await transaction.get(gameRef);
                if (!gameDoc.exists()) return null;

                const gameData = gameDoc.data();
                const claimedBy = gameData.superpowersClaimed || {};

                if (!claimedBy[round]) {
                    // Get team name
                    const teamRef = doc(db, "teams", teamId);
                    const teamDoc = await transaction.get(teamRef);
                    const teamData = teamDoc.data();
                    const teamName = teamData.name;

                    // Claim it!
                    claimedBy[round] = { teamId, teamName, claimedAt: new Date() };
                    transaction.update(gameRef, { superpowersClaimed: claimedBy });

                    // Update team's superpower list
                    const currentProgress = teamData.progress || {};
                    const superpowers = currentProgress.superpowers || { round1: false, round2: false };
                    superpowers[round] = true;

                    transaction.update(teamRef, {
                        "progress.superpowers": superpowers,
                        lastActivityAt: new Date()
                    });

                    return { success: true, teamName };
                } else {
                    return { success: false, error: `Already claimed by ${claimedBy[round].teamName}` };
                }
            });
        } catch (e) {
            console.error("Error claiming superpower with code: ", e);
            return null;
        }
    },

    claimSuperpowerWithGlobalCode: async (round, enteredCode) => {
        try {
            const { query, where, collection, getDocs, doc, runTransaction } = await import("firebase/firestore");
            const gameRef = doc(db, "game", "status");

            const q = query(collection(db, "teams"), where(`progress.round1.secretCode`, "==", enteredCode.toUpperCase()));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return { success: false, error: "The code matches no warrior's trial. Try again." };
            }

            const teamDoc = querySnapshot.docs[0];
            const teamId = teamDoc.id;
            const teamData = teamDoc.data();
            const teamName = teamData.name;

            return await runTransaction(db, async (transaction) => {
                const gameDocSnapshot = await transaction.get(gameRef);
                if (!gameDocSnapshot.exists()) return { success: false, error: "Game not initialized" };
                const gameDocData = gameDocSnapshot.data();
                const claimedBy = gameDocData.superpowersClaimed || {};

                if (!claimedBy[round]) {
                    claimedBy[round] = { teamId, teamName, claimedAt: new Date() };
                    transaction.update(gameRef, { superpowersClaimed: claimedBy });

                    const progress = teamData.progress || {};
                    const superpowers = progress.superpowers || { round1: false, round2: false };
                    superpowers[round] = true;

                    transaction.update(doc(db, "teams", teamId), {
                        "progress.superpowers": superpowers,
                        lastActivityAt: new Date()
                    });
                    return { success: true, teamName };
                } else {
                    return { success: false, error: `Too late! The power was already claimed by ${claimedBy[round].teamName}.` };
                }
            });
        } catch (e) {
            console.error(e);
            return { success: false, error: "System error while consulting the Akashic records." };
        }
    }
};
