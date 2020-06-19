import Cookie from 'universal-cookie';

const cookie = new Cookie();

class CookieService{
    get(key){
        return cookie.get(key);
    }

    set(key, value, options){
        return cookie.set(key, value, options);
    }

    remove(key, options){
       cookie.remove(key, options)
    }
}

export default new CookieService();