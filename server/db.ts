export default {
  async getUser(id: string){
    return { id, email: "user@example.com", plan: "free", addons: [] };
  },
  async saveUser(user: any){
    return user;
  }
};
