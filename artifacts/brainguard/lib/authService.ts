import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Platform } from "react-native";
import { auth, db } from "./firebase";

export type AuthUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export async function saveUserToFirestore(user: User) {
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      displayName: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? "",
      lastLogin: serverTimestamp(),
    },
    { merge: true }
  );
}

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

export async function signInWithGoogle(): Promise<AuthUser | null> {
  if (Platform.OS === "web") {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    await createUserRecord(result.user);
    return mapUser(result.user);
  }
  return null;
}

export async function signInWithGoogleNative(
  idToken: string
): Promise<AuthUser | null> {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  await createUserRecord(result.user);
  return mapUser(result.user);
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      saveUserToFirestore(user);
      callback(mapUser(user));
    } else {
      callback(null);
    }
  });
}

function mapUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName ?? "BrainGuard User",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
  };
}
