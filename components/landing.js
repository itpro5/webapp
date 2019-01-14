const LandingPage = {
    template: `
        <v-container grid-list-xl text-xs-center fill-height>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-alert :value="true" color="info" icon="priority_high" outline>
                        <div class="headline">
                            Let's Change The Way We Write & Share our Portfolio/CV
                            in Software Industry... as a Dev Guy
                        </div>
                    </v-alert>
                </v-flex>
                <v-flex v-for="i in 3" :key="i" md4>
                    <v-icon x-large>format_quote</v-icon>
                    <div class="title">Reason here</div>
                    <div class="body-2 mt-3 text-justify">
                        Cras facilisis mi vitae nunc lobortis pharetra. 
                        Nulla volutpat tincidunt ornare. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-menu offset-y>
                        <v-btn large slot="activator">
                            <v-icon>find_in_page</v-icon>&nbsp;&nbsp;See Example
                        </v-btn>
                        <v-list>
                            <v-list-tile @click="open_new_tab('https://google.com')">
                                <v-list-tile-title>Portfolio page</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="open_new_tab('https://yahoo.com')">
                                <v-list-tile-title>CV page</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <v-btn large color="primary" @click="github_login">
                        <v-icon>mdi-github-circle</v-icon>
                        &nbsp;&nbsp;Start with GitHub
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    `,
    methods: {
        // Open url in new window
        open_new_tab: function(_url) {
            window.open(_url, '_blank')
        },
        github_login: function() {
            this.$store.dispatch('github_login')
        }
    }
}