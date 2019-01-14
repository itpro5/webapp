const RegisterPage = {
    template: `
        <v-container grid-list-xl text-xs-center>
            <v-layout column>
                <v-flex xs12>
                    <div class="headline">
                        Let's start the journey by these first simple steps
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-stepper :value="current_step">
                        <!-- HEADER -->
                        <v-stepper-header>
                            <v-stepper-step step="1" :complete="current_step > 1">
                                Register a domain
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="2" :complete="current_step > 2">
                                Pick a template
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="3" :complete="current_step > 3">
                                Configure GitHub Pages
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4" :complete="current_step > 4">
                                Finish
                            </v-stepper-step>
                        </v-stepper-header>

                        <!-- ITEMS -->
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-layout column align-center>
                                    <v-flex xs12>
                                        <div class="body-2">Register a personal domain name for your page</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-alert type="error"
                                                    transition="scale-transition"
                                                    v-model="subdomain_reg_alert"
                                                    outline>
                                            {{ subdomain_reg_alert_msg }}
                                        </v-alert>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-form v-model="subdomain_reg_form_valid">
                                            <v-text-field placeholder="johndoe"
                                                            suffix=".branding.com"
                                                            v-model="subdomain"
                                                            :counter="7"
                                                            :rules="subdomain_rules"
                                                            required
                                                            >
                                            </v-text-field>
                                            <v-btn color="primary" @click="subdomain_register"
                                                    :loading="subdomain_register_wait" 
                                                    :disabled="!subdomain_reg_form_valid || subdomain_register_wait">
                                                Register
                                            </v-btn>
                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-layout column align-center>
                                    <v-flex xs12>
                                        <div class="body-2">Choose to fork a GitHub template project</div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-alert type="error"
                                                    transition="scale-transition"
                                                    v-model="fork_alert"
                                                    outline>
                                            {{ fork_alert_msg }}
                                        </v-alert>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-form>
                                            <v-radio-group value="advanced" v-model="fork_template">
                                                <v-radio value="advanced">
                                                    <div slot="label">Advanced (included well-crafted portfolio & cv example pages)</div>
                                                </v-radio>
                                                <v-radio value="basic">
                                                    <div slot="label">Basic (included only simple index page)</div>
                                                </v-radio>
                                            </v-radio-group>
                                            <v-btn color="primary" @click="fork_now"
                                                    :loading="fork_wait"
                                                    :disabled="fork_wait">
                                                Fork
                                            </v-btn>
                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-layout column align-center>
                                    <v-flex xs12>
                                        <div class="body-2">
                                            <a :href="forked_repo_setting_page" target="_blank">Open the Settings page</a> for the newly forked GitHub Repository, then:
                                        </div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-alert type="error"
                                                    transition="scale-transition"
                                                    v-model="finalize_alert"
                                                    outline>
                                            {{ finalize_alert_msg }}
                                        </v-alert>
                                        <ul class="py-3 text-xs-left">
                                            <li>Scroll down to <b>GitHub Pages</b> section near the bottom</li>
                                            <li>The value of GitHub Pages <b>Source</b> may be <b>None</b>, click <b>Source</b> dropdown list, then choose the first option (<b>master branch</b>)</li>
                                            <li>Click <b>Save</b> button near the <b>Source</b> dropdown list</li>
                                            <li>After saving the <b>Source</b> configuration, click the <b>Finalize</b> button bellow</li>
                                        </ul>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-form>
                                            <v-btn color="primary" @click="finalize"
                                                    :loading="finalize_wait"
                                                    :disabled="finalize_wait">
                                                Finalize
                                            </v-btn>
                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-stepper-content>
                            <v-stepper-content step="4">
                                <v-btn color="primary" to="/dashboard">Go to Dashboard</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            current_step: 1,
            
            //-- Vars for step 1
            subdomain: '',
            subdomain_register_wait: false,
            subdomain_rules: [
                v => !!v || 'Required',
                v => (v && 4 <= v.length && v.length <= 7) || 'Must be from 4-7 characters'
            ],
            subdomain_reg_form_valid: false,
            subdomain_reg_alert: false,
            subdomain_reg_alert_msg: '',
            
            //-- Vars for step 2
            fork_template: 'advanced',
            fork_wait: false,
            fork_alert: false,
            fork_alert_msg: '',
            forked_repo_id: null,
            forked_repo_url: '',
            forked_repo_api_url: '',
            
            //-- Vars for step 3
            finalize_wait: false,
            finalize_alert: false,
            finalize_alert_msg: ''
        }
    },
    computed: {
        github_repo_path: function() {
            if (this.fork_template === 'advanced') {
                return 'itpro5/template-basic'
            } else {
                return 'itpro5/template-basic'
            }
        },
        forked_repo_setting_page: function() {
            return this.forked_repo_url + '/settings'
        }
    },
    methods: {
        subdomain_register() {
            // waiting...
            this.subdomain_register_wait = true

            const github_login = localStorage.getItem('github_login')
            const vue_instance = this
            const post_url = `${this.$store.getters.now_api_base_url}/reg_domain.js?subdomain=${this.subdomain}&github_login=${github_login}`            
            axios.post(post_url, {}, {
                headers: {'Fibtoken': this.$store.getters.user.fib_token}
            }).then(
                result => {
                    console.log('subdomain_register() result: ', result)
                    if (result && result.data.code == 'TAKEN') {
                        vue_instance.subdomain_reg_alert = true
                        vue_instance.subdomain_reg_alert_msg = 
                            'This domain is taken, please choose another one.'
                    } else if (result && result.data.code == 'CONT') {
                        vue_instance.current_step = 2
                        // reset
                        vue_instance.subdomain_reg_alert = false
                        vue_instance.subdomain_reg_alert_msg = ''
                    } else {
                        vue_instance.subdomain_reg_alert = true
                        vue_instance.subdomain_reg_alert_msg = 
                            'The free API quota has exceeded, please try again latter.'
                    }
                    vue_instance.subdomain_register_wait = false
                }
            ).catch(
                error => {
                    console.log('subdomain_register() error: ', error)
                    vue_instance.subdomain_reg_alert = true
                    vue_instance.subdomain_reg_alert_msg = 
                        'The free API quota has exceeded, please try again latter...!'
                    vue_instance.subdomain_register_wait = false
                }
            )
        },
        subdomain_register_cloudfunctions() {
            // waiting...
            this.subdomain_register_wait = true
            
            // API call            
            //
            // For more info, visit
            // https://stackoverflow.com/questions/48080130/why-cant-i-access-vuejs-this-within-firebase-then-callbacks
            //
            const vue_instance = this
            fibFunc.httpsCallable('RegisterDomain')({subdomain: this.subdomain}).then(
                function(result) {
                    
                }
            ).catch(
                function(error) {
                    
                }
            )
            // setTimeout(() => {
            //     this.subdomain_register_wait = false;
            //     this.subdomain_reg_alert = true;
            //     this.subdomain_reg_alert_msg = 'jaskf kajsfdk jaskfd jalksjflkas f';
            // }, 2000);
        },
        fork_now() {
            this.fork_wait = true

            const github_token = localStorage.getItem('github_token')
            const vue_instance = this
            const post_url = `${this.$store.getters.now_api_base_url}/fork_repo.js?repo_path=${this.github_repo_path}`
            axios.post(post_url, {}, {
                headers: {'github-token': github_token}
            }).then(
                result => {
                    console.log('fork_now() result: ', result)
                    if (result && result.data.code == 'OK') {
                        this.forked_repo_id = result.data.repo_id
                        this.forked_repo_url = result.data.forked_url
                        this.forked_repo_api_url = result.data.api_url
                        
                        if (this.forked_repo_url != ''
                            && this.forked_repo_api_url != ''
                            && this.forked_repo_id) {
                            localStorage.setItem('github_repo_id', this.forked_repo_id)
                            this.current_step = 3
                        }
                        // reset
                        vue_instance.fork_alert = false
                        vue_instance.fork_alert_msg = ''                        
                    } else {
                        vue_instance.fork_alert = true
                        vue_instance.fork_alert_msg = 
                            'The free API quota has exceeded, please try again latter...!'
                    }
                    vue_instance.fork_wait = false
                }
            ).catch(
                error => {
                    console.log('fork_now() error: ', error)
                    vue_instance.fork_alert = true
                    vue_instance.fork_alert_msg = 
                        'The free API quota has exceeded, please try again latter...!'
                    vue_instance.fork_wait = false
                }
            )
        },
        finalize() {
            this.finalize_wait = true
            
            const github_token = localStorage.getItem('github_token')
            const vue_instance = this
            const post_url = `${this.$store.getters.now_api_base_url}/cname_commit.js`
            axios.post(post_url, {
                forked_repo_api_url: this.forked_repo_api_url,
                cname: this.subdomain
            }, {
                headers: {'github-token': github_token}
            }).then(
                result => {
                    console.log('finalize() result: ', result)
                    if (result && result.data.code == 'OK') {
                        // Assign repo to user
                        const url2 = `${this.$store.getters.now_api_base_url}/assign_repo.js?subdomain=${this.subdomain}&repoid=${this.forked_repo_id}`            
                        axios.post(url2, {}, {
                            headers: {'Fibtoken': this.$store.getters.user.fib_token}
                        }).then(
                            result => {
                                console.log('assign_repo() result: ', result)
                                if (result && result.data.code == 'OK') {
                                    // Move forward
                                    this.current_step = 4
                                    // Reset
                                    vue_instance.finalize_alert = false
                                    vue_instance.finalize_alert_msg = ''
                                } else {
                                    vue_instance.finalize_alert = true
                                    vue_instance.finalize_alert_msg = 
                                        'The free API quota has exceeded, please try again latter...!'
                                }
                                vue_instance.finalize_wait = false
                            }
                        ).catch(
                            error => {
                                console.log('assign_repo() error: ', error)
                                vue_instance.finalize_alert = true
                                vue_instance.finalize_alert_msg = 
                                    'The free API quota has exceeded, please try again latter...!'
                                vue_instance.finalize_wait = false
                            }
                        )                 
                    } else {
                        vue_instance.finalize_alert = true
                        vue_instance.finalize_alert_msg = 
                            'The free API quota has exceeded, please try again latter...!'
                        vue_instance.finalize_wait = false
                    }
                }
            ).catch(
                error => {
                    console.log('finalize() error: ', error)
                    vue_instance.finalize_alert = true
                    vue_instance.finalize_alert_msg = 
                        'The free API quota has exceeded, please try again latter...!'
                    vue_instance.finalize_wait = false
                }
            )
        }
    }
}
