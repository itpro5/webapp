const app_router = new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: LandingPage },
        { path: '/register', component: RegisterPage, meta: {_auth: true, _reg: true} },
        { path: '/dashboard', component: DashboardPage, meta: {_auth: true} },
        { path: '*', component: NotFoundPage}
    ]
})

app_router.beforeEach((to, from, next) => {
    const auth_required = to.matched.some(record => record.meta._auth)
    const is_authenticated = fibAuth.currentUser
    if (auth_required && !is_authenticated) {
        next('/')
    } else {
        const _reg = to.matched.some(record => record.meta._reg)
        if (_reg) {
            const repo_id = localStorage.getItem('github_repo_id')
            if (!repo_id) {
                next()
            } else {
                next('/dashboard')
            }
        } else {
            next()
        }
    }
})
