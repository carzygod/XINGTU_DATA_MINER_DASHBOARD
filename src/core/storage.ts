let globalConfig = {
    isLogin:"isLogin",
}

const setIsLogin = (ln:any)=>
{
    localStorage.setItem(globalConfig.isLogin,ln)
}
const getIsLogin = ()=>
{
    return localStorage.getItem(globalConfig.isLogin);
}

export{
    setIsLogin,
    getIsLogin
} 