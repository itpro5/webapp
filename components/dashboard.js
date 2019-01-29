const DashboardPage = {
    template: `
        <v-container grid-list-xl text-xs-center>
            <v-layout column>
                <v-flex xs12>
                    <div class="headline">
                        Your GitHub Repo's statistics
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-card class="px-4">
                        <v-layout wrap>
                            <v-flex text-xs-center>
                                <v-card dark color="primary">
                                    <v-card-text>
                                        <div class="display-1 font-weight-medium">{{repo_views}}</div>
                                        <div class="title font-weight-light">Views</div>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex text-xs-center>
                                <v-card dark color="primary">
                                    <v-card-text>
                                        <div class="display-1 font-weight-medium">{{repo_unique_visitors}}</div>
                                        <div class="title font-weight-light">Unique Visitors</div>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex align-self-end>
                                <v-layout wrap fill-height align-center>
                                    <v-flex>
                                        <div class="headline font-weight-light text-truncate primary--text">{{user_domain}}</div>
                                        <input type="hidden" id="element_user_domain" :value="user_domain">
                                    </v-flex>
                                    <v-flex text-xs-right>
                                        <v-tooltip top class="hidden-xs-only">
                                            <v-btn icon @click="visibility_btn_click" slot="activator">
                                                <v-icon color="primary">visibility</v-icon>
                                            </v-btn>
                                            <span>Open on new tab</span>
                                        </v-tooltip>
                                        <v-tooltip top class="hidden-xs-only">
                                            <v-btn icon @click="share_btn_click" slot="activator">
                                                <v-icon color="primary">share</v-icon>
                                            </v-btn>
                                            <span>Sharing on Facebook</span>
                                        </v-tooltip>
                                        <v-tooltip top class="hidden-xs-only">
                                            <v-btn icon @click="copy_btn_click" slot="activator">
                                                <v-icon color="primary">file_copy</v-icon>
                                            </v-btn>
                                            <span>Copy to clipboard</span>
                                        </v-tooltip>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout>
                            <v-flex text-xs-left class="mt-2 px-5 title font-weight-light">
                                <p>Hey friend, may be you want to have some reports about view counts,
                                    unique visitors... of your itpro5 page instead of  traffic report
                                    about your GitHub repository.</p>
                                <p>This is exactly what I want too. I intend to develop a Serverless Analytic service
                                    to enable that feature, in addition to that, It would be helpful if the user is allowed
                                    to share & choose the template web page in a large Portfolio/CV market place.
                                    To make these things happen I need your help with ideas, coding or design skills.</p>
                                <p><strong>I invite you to join ITPro5</strong>, an open source project,
                                    build by enthusiasts and for community.
                                    <br/>Please feel free to contact me by email address: <strong>contact@itpro5.com</strong></p>
                            </v-flex>
                        </v-layout>

                        <v-snackbar v-model="snackbar_show" top color="success">{{snackbar_text}}</v-snackbar>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            repo_views: null,
            repo_unique_visitors: null,
            github_cname: null,
            snackbar_show: false,
            snackbar_text: null
        }
    },
    computed: {
        user_domain: function() {
            return 'https://' + this.github_cname + '.itpro5.com'
        }
    },
    methods: {
        visibility_btn_click() {
            window.open(this.user_domain, '_blank')
        },
        share_btn_click() {
            var url = 'https://www.facebook.com/sharer/sharer.php?u=@url&quote=@quote'
                        .replace(/@url/g, encodeURIComponent(this.user_domain))
                        .replace(/@quote/g, encodeURIComponent('Let\'s Change The Way We Write & Share our Portfolio/CV in Software Industry... as a Dev Guy'))
            window.open(url, '_blank')
        },
        copy_btn_click() {
            var item = document.getElementById('element_user_domain')
            item.setAttribute('type', 'text')
            item.select()
            document.execCommand('copy')
            item.setAttribute('type', 'hidden')
            
            this.snackbar_text = 'Your itpro5 URL was copied.'
            this.snackbar_show = true
        }
    },
    created: function() {
        const user_repo_id = localStorage.getItem('github_repo_id')
        const github_token = localStorage.getItem('github_token')
        this.github_cname = localStorage.getItem('github_cname')

        console.log('user_repo_id:', user_repo_id)

        axios.get(`https://api.github.com/repositories/${user_repo_id}/traffic/views`, {
            headers: {
                'Authorization': `token ${github_token}`
            }
        }).then(
            response => {
                console.log('get_repo_traffic() response:', response.data)
                if (response.data) {
                    this.repo_views = response.data.count
                    this.repo_unique_visitors = response.data.uniques
                }
            }
        ).catch(
            err => {
                console.log('get_repo_traffic() err:', err)
            }
        )
    }
}
