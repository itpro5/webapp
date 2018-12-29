const app_router = new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: LandingPage },
        { path: '/console', component: ConsolePage, meta: {_auth: true} },
        { path: '*', component: NotFoundPage}
    ]
})

app_router.beforeEach((to, from, next) => {
    const auth_required = to.matched.some(record => record.meta._auth)
    const is_authenticated = fibAuth.currentUser
    if (auth_required && !is_authenticated) {
        next('/')
    } else {
        next()
    }
})
