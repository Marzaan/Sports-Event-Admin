class SessionHelper {
    static setUserEmail(email){
        return sessionStorage.setItem("email",email);
    }
    static getUserEmail(){
        return sessionStorage.getItem("email");
    }
    static removeUserEmail(){
        return sessionStorage.removeItem("email");
    }
}
export default SessionHelper;