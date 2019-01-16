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
                                        <div class="headline font-weight-light text-truncate">vdeveloperssss.xyziv.com</div>
                                    </v-flex>
                                    <v-flex text-xs-right>
                                        <v-btn icon><v-icon color="primary">visibility</v-icon></v-btn>
                                        <v-btn icon><v-icon color="primary">share</v-icon></v-btn>
                                        <v-btn icon><v-icon color="primary">file_copy</v-icon></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout>
                            <v-flex text-xs-center>
                                <p>Hello world</p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    data: function() {
        return {
            repo_views: null,
            repo_unique_visitors: null
        }
    },
    created: function() {
        const user_repo_id = localStorage.getItem('github_repo_id')
        const github_token = localStorage.getItem('github_token')
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
