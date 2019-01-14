let app_store = new Vuex.Store({
    state: {
        now_api_base_url: 'https://apinow-9ait5znqx.now.sh',
        loading: false, // sign in loading
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
        },
        now_api_base_url(state) {
            return state.now_api_base_url
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
                        var github_token = result.credential.accessToken
                        console.log('signInWithPopup() - github access token: ', github_token)

                        // Save github token for latter use
                        localStorage.setItem('github_token', github_token);

                        // Retrieve github username
                        axios.get('https://api.github.com/user', {
                            headers: {'Authorization': 'token ' + github_token}
                        }).then(
                            result => {
                                console.log('github user info result:', result)
                                localStorage.setItem('github_login', result.data.login)
                            }
                        ).catch(
                            error => {
                                console.log('github user info error:', error)
                            }
                        )
            
                        // The signed-in user info.
                        var user = result.user
                        console.log('signInWithPopup() - user: ', user)

                        user.getIdToken(/* forceRefresh */ true).then(
                            id_token => {
                                console.log('signInWithPopup() - getIdToken value: ', id_token)
                                commit('setUser', {
                                    email: user.email,
                                    avatar: user.photoURL,
                                    fib_token: id_token
                                })
                                commit('setLoading', false)
                                app_router.push('/register')
                            }
                        ).catch(
                            error => {
                                console.log('signInWithPopup() - getIdToken error: ', error.message)
                            }
                        )                        
                    }                    
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
        auto_login({commit}, /* user */ payload) {
            console.log('auto_login() begin...')
            payload.getIdToken(/* forceRefresh */ true).then(
                id_token => {
                    console.log('auto_login() - getIdToken value: ', id_token)
                    commit('setUser', {
                        email: payload.email,
                        avatar: payload.photoURL,
                        fib_token: id_token
                    })
                    app_router.push('/register')
                }
            ).catch(
                error => {
                    console.log('auto_login() - getIdToken error: ', error.message)
                }
            )
        },
        logout({commit}, payload) {
            console.log('logout() begin...')
            fibAuth.signOut()
            commit('setUser', null)
            app_router.push('/')
        }
    }
})
