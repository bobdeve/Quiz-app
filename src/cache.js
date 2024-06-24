// src/cache.js
class Cache {
    constructor() {
      this.cache = {};
    }
  
    get(key) {
      return this.cache[key];
    }
  
    set(key, value) {
      this.cache[key] = value;
    }
  
    has(key) {
      return key in this.cache;
    }
  }
  
  const cache = new Cache();
  export default cache;
  