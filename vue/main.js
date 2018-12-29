// let vue_app = new Vue({
//     router: app_router,
//     el: '#app',
//     store: app_store,
//     methods: {
//         github_login() {
//             this.$store.dispatch('github_login')
//         },
//         logout() {
//             this.$store.dispatch('logout')
//         }
//     },
//     created() {
//         fibAuth.onAuthStateChanged(
//             function(user) {
//                 if (user) {
//                     console.log('onAuthStateChanged(): user: ', user)
//                     app_store.dispatch('auto_login', user)
//                 } else {
//                     console.log('onAuthStateChanged(): anonymous user')
//                 }
//             }
//         )
//     }
// })

const unsubscribe = fibAuth.onAuthStateChanged((user) => {
    new Vue({
        router: app_router,
        el: '#app',
        store: app_store,
        methods: {
            github_login() {
                this.$store.dispatch('github_login')
            },
            logout() {
                this.$store.dispatch('logout')
            }
        },
        created() {
            if (user) {
                app_store.dispatch('auto_login', user)
            }
        }
    })
    unsubscribe()
})
