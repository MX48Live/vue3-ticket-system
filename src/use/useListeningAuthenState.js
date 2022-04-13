import { getAuth, onAuthStateChanged } from "firebase/auth"
import { authStatus } from "@/stores/auth_status"
import router from "../router"

export const listeningAuthenState = async () => {
    const auth_status = authStatus()
    
    await onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            auth_status.userSignIn()
            auth_status.finishChecking()
        } else {
            auth_status.userSignOut()
            auth_status.finishChecking()
        }
    }) 
}
