import { GoogleAuthProvider, signInWithRedirect, GithubAuthProvider } from "firebase/auth"
import { auth } from "../config/firebase.config"
import { v4 as uuidv4 } from 'uuid'

const googleProvider = new GoogleAuthProvider()
export const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider).then(userCred =>
        window.Location.reload())
}

const githubProvider = new GithubAuthProvider()
export const signInWithGithub = async () => {
    await signInWithRedirect(auth, githubProvider).then(userCred =>
        window.Location.reload())
}

export const MenuItems = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Collections", uri: "/home/collections" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" }
]

export const signOutAction = async () => {
    await auth.signOut().then(() => {
        window.location.reload();
    })
}