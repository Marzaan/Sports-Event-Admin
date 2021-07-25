class ApiURL {
    static baseURL = "http://127.0.0.1:8000/api/";

    // User Login-Register
    static register = this.baseURL + "register";
    static login = this.baseURL + "login";
    static logout = this.baseURL + "logout";
    static userDetails(email){
        return this.baseURL + "user/" + email;
    }

    // Category
    static getCategory = this.baseURL + "categories";
    static addCategory = this.baseURL + "addCategory";
    static updateCategory(id){
        return this.baseURL + "updateCategory/" + id;
    }
    static deleteCategory(id){
        return this.baseURL + "deleteCategory/" + id;
    }

    // Event
    static getEvent = this.baseURL + "events";
    static addEvent = this.baseURL + "addEvent";
    static featuredEvent(id){
        return this.baseURL + "featuredEvent/" + id;
    }
    static updateEvent(id){
        return this.baseURL + "updateEvent/" + id;
    }
    static deleteEvent(id){
        return this.baseURL + "deleteEvent/" + id;
    }
}
export default ApiURL;