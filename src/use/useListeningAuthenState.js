import { getAuth, onAuthStateChanged } from "firebase/auth"
import { authStatus } from "@/stores/auth_status"
import router from "../router"

export const listeningAuthenState = async () => {
    const authen_status = authStatus()
    
    await onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            authen_status.userSignIn()
        } else {
            authen_status.userSignOut()
        }
    }) 
}
