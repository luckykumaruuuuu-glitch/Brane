import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export type AuthUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export async function createUserRecord(user: User) {
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      displayName: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function signInWithGoogle(): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  const result = await signInWithPopup(auth, provider);
  await createUserRecord(result.user);
  return mapUser(result.user);
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? mapUser(user) : null);
  });
}

function mapUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName ?? "BrainPal User",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
  };
}
