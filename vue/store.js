let app_store = new Vuex.Store({
    state: {
        loading: false,
        user: null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        user(state) {
            return state.user
        }
    },
    actions: {
        github_login({ commit }, payload) {
            console.log('github_login() - github login processing...')
            console.log('github_login() - payload: ', payload)
            commit('setLoading', true)
            fibAuth.signInWithPopup(githubProvider).then(
                function(result) {
                    console.log('signInWithPopup() - getting result...')
                    if (result !== undefined && 'credential' in result) {
                        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                        var token = result.credential.accessToken
                        console.log('signInWithPopup() - token: ', token)
            
                        // The signed-in user info.
                        var user = result.user
                        console.log('signInWithPopup() - user: ', user)
                        commit('setUser', {
                            email: user.email,
                            avatar: user.photoURL
                        })
                        app_router.push('/console')
                    }
                    commit('setLoading', false)
                }
            ).catch(
                function(error) {
                    var errorCode = error.code
                    var errorMessage = error.message
                    console.log('signInWithPopup() - error: ', errorMessage)
                    commit('setLoading', false)
                }
            )
        },
        auto_login({commit}, payload) {
            commit('setUser', {
                email: payload.email,
                avatar: payload.photoURL
            })
            app_router.push('/console')
        },
        logout({commit}, payload) {
            fibAuth.signOut()
            commit('setUser', null)
            app_router.push('/')
        }
    }
})
