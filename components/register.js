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
                                Wating for processing
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
                                    <v-flex xs12 sm6 md4>
                                        <v-form>
                                            <v-radio-group value="advanced">
                                                <v-radio value="advanced">
                                                    <div slot="label">Advanced (included well-crafted portfolio & cv example pages)</div>
                                                </v-radio>
                                                <v-radio value="basic">
                                                    <div slot="label">Basic (included only simple index page)</div>
                                                </v-radio>
                                            </v-radio-group>
                                            <v-btn color="primary" @click="current_step = 3">Fork</v-btn>
                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-btn @click="current_step = 1">Go to Dashboard</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            current_step: 2,
            
            subdomain: '',
            subdomain_register_wait: false,
            subdomain_rules: [
                v => !!v || 'Required',
                v => (v && 4 <= v.length && v.length <= 7) || 'Must be from 4-7 characters'
            ],
            subdomain_reg_form_valid: false,
            subdomain_reg_alert: false,
            subdomain_reg_alert_msg: ''
        }
    },
    methods: {
        subdomain_register() {
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
                    console.log('RegisterDomain() result: ', result)
                    if (result && result.data.code == 'TAKEN') {
                        vue_instance.subdomain_reg_alert = true
                        vue_instance.subdomain_reg_alert_msg = 
                            'This domain is not available for you, please choose another one.'
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
                function(error) {
                    console.log('RegisterDomain() error: ', error)
                }
            )
            // setTimeout(() => {
            //     this.subdomain_register_wait = false;
            //     this.subdomain_reg_alert = true;
            //     this.subdomain_reg_alert_msg = 'jaskf kajsfdk jaskfd jalksjflkas f';
            // }, 2000);
        }
    }
}
